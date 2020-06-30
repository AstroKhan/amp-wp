
/**
 * WordPress dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

const NEXT_BUTTON_SELECTOR = '.amp-setup-nav__prev-next button.is-primary';
const PREV_BUTTON_SELECTOR = '.amp-setup-nav__prev-next button:not(.is-primary)';

describe( 'AMP Setup Screen', () => {
	beforeEach( async () => {
		await visitAdminPage( 'admin.php', 'page=amp-setup' );
		await page.waitForSelector( '.amp-setup-nav__prev-next' );
	} );

	it( 'should contain app root', async () => {
		await expect( page ).toMatchElement( '#amp-setup' );
	} );

	const getTitleText = async () => {
		await page.waitForSelector( 'h1' );
		return page.$eval( 'h1', ( el ) => el.innerText );
	};

	it( 'should have stepper items', async () => {
		await page.waitForSelector( '.amp-stepper__item' );
		const itemCount = await page.$$eval( '.amp-stepper__item', ( els ) => els.length );

		expect( itemCount ).toBe( 6 );
	} );

	it( 'should be navigable', async () => {
		let titleText;

		titleText = await getTitleText();
		expect( titleText ).toBe( 'Welcome to the Official AMP Plugin for WordPress' );

		await page.waitForSelector( `${ NEXT_BUTTON_SELECTOR }:not([disabled])` );
		await page.click( NEXT_BUTTON_SELECTOR );
		titleText = await getTitleText();
		expect( titleText ).toBe( 'Are you technical?' );

		await page.$eval( '#technical-background-disable', ( el ) => el.click() );

		await page.waitForSelector( `${ NEXT_BUTTON_SELECTOR }:not([disabled])` );
		await page.click( NEXT_BUTTON_SELECTOR );
		titleText = await getTitleText();
		expect( titleText ).toBe( 'Template modes' );

		await page.click( PREV_BUTTON_SELECTOR );
		titleText = await getTitleText();
		expect( titleText ).toBe( 'Are you technical?' );
	} );

	it( 'hides prev button page one and two and disables next button on last page', async () => {
		const prevButton = await page.$( PREV_BUTTON_SELECTOR );
		expect( prevButton ).toBeNull();
	} );
} );
