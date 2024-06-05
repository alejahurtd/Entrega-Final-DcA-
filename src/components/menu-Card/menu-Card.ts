import MenuStyle from './menu-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class MenuCard extends HTMLElement {
	publication?: string;
	likes?: string;
	user?: string;
	caption?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			user: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const styleElement = document.createElement('style');
			styleElement.textContent = MenuStyle;
			this.shadowRoot?.appendChild(styleElement);

			const containerLogo = this.ownerDocument.createElement('div');
			containerLogo.classList.add('icon');

			const left = this.ownerDocument.createElement('div');
			left.classList.add('left');

			const notificationButton = this.ownerDocument.createElement('img');
			notificationButton.src = '/img/icon notifications.png';
			notificationButton.classList.add('icons');
			left.appendChild(notificationButton);
			notificationButton.addEventListener('click', () => {
				dispatch(navigate(Screens.NOTIFICATION));
			});
			const homeButton = this.ownerDocument.createElement('img');
			homeButton.src = '/img/icon home.png';
			homeButton.classList.add('icons');
			left.appendChild(homeButton);
			homeButton.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			const profileButton = this.ownerDocument.createElement('img');
			profileButton.src = '/img/icon profile.png';
			profileButton.classList.add('user');
			left.appendChild(profileButton);
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			this.shadowRoot?.appendChild(left);

			const logo = this.ownerDocument.createElement('img');
			logo.src = '/img/logo.png';
			logo.classList.add('logo-completo');
			containerLogo.appendChild(logo);
			logo.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			this.shadowRoot?.appendChild(containerLogo);
		}
	}
}

customElements.define('menu-card', MenuCard);
export default MenuCard;
