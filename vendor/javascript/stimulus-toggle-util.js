import{Controller as t}from"stimulus";class toggle_controller extends t{toggle(t){const e=t.currentTarget.dataset.toggleTarget.split(",");const l=this.element.dataset.hiddenClass||"is-hidden";e.forEach(t=>document.querySelectorAll(`[data-toggle-name="${t}"]`).forEach(t=>t.classList.toggle(l)))}}export default toggle_controller;

