/** @format */

;(function (global) {
	global.Accordion = function ({
		oneOpen = true,
		speed = 500,
		easing = 'cubic-bezier(0.55, 0, 0.1, 1)',
		repositionOpenItem = false,
		repositionDistance = 300,
		repositionDelay = 400,
		classNames: {
			accordion = 'cc-accordion',
			item = 'cc-accordion-item',
			head = 'cc-accordion-header',
			body = 'cc-accordion-body',
			icon = 'cc-accordion-icon',
		} = {},
	}) {
		const accordionElems = document.querySelectorAll(`.${accordion}`)

		accordionElems.forEach((accordionElem) => {
			const accordionHeaders = accordionElem.querySelectorAll(`.${head}`)
			const accordionItems = accordionElem.querySelectorAll(`.${item}`)

			const toggle = function (element) {
				const accordionItem = element.closest(`.${item}`)
				const accordionBody = accordionItem.querySelector(`.${body}`)
				const accordionIcon = accordionItem.querySelector(`.${icon}`)

				accordionBody.style.transition = `max-height ${speed}ms ${easing}`
				accordionIcon.style.transition = `transform ${speed}ms ${easing}`

				if (accordionItem.getAttribute('cc-accordion-open') === 'true') {
					accordionItem.setAttribute('cc-accordion-open', 'false')
					accordionItem.classList.remove('open')
					accordionIcon.classList.remove('open')
					accordionBody.style.maxHeight = null
				} else {
					if (oneOpen) {
						accordionItems.forEach((i) => {
							i.setAttribute('cc-accordion-open', 'false')
							i.classList.remove('open')
							i.querySelector(`.${icon}`).classList.remove('open')
							i.querySelector(`.${body}`).style.maxHeight = null
						})
					}
					accordionItem.setAttribute('cc-accordion-open', 'true')
					accordionItem.classList.add('open')
					accordionIcon.classList.add('open')
					accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`
				}

				if (repositionOpenItem) {
					setTimeout(() => {
						window.scroll({
							top:
								element.getBoundingClientRect().top +
								window.scrollY -
								repositionDistance,
							behavior: 'smooth',
						})
					}, repositionDelay)
				}
			}

			accordionHeaders.forEach((header) => {
				header.addEventListener('click', function () {
					toggle(this)
				})
			})

			accordionItems.forEach((item) => {
				const accordionBody = item.querySelector(`.${body}`)
				const accordionIcon = item.querySelector(`.${icon}`)
				if (item.getAttribute('cc-accordion-open') === 'true') {
					item.classList.add('open')
					accordionIcon.classList.add('open')
					accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`
				} else {
					item.classList.remove('open')
					accordionIcon.classList.remove('open')
					accordionBody.style.maxHeight = null
				}
			})
		})
	}
})((globalThis.CodeCrumbs = globalThis.CodeCrumbs || {}))
