const { test, expect } = require('@playwright/test');

test.describe('Translate Singlish to Sinhala', () => {

  const testInputs = [
    'mama gedhara yanavaa',
    'aadhaayamata vadaa aduven viyadham karanna purudhu venna.',
    'venasakatath ekka api adha kopi ekak bomudha?',
    'magee aedhum okkoma paraNayi.mata aluthen aedhum tikak ganna oonee .mata Rs.50,000 salli dhennakoo',
    'vaedi siini thee ekak genna',
    'pirimi okkoma ekayi',
    'oyaa vaedipura kaemathi polisi yannadha?'
  ];

  test('Singlish to Sinhala', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/');

    // ✅ Correct elements
    const inputBox = page.locator('textarea');
    const outputBox = page.locator('div').nth(1); // output area

    for (const input of testInputs) {
      await inputBox.fill(input);          
      await page.waitForTimeout(1000);     // wait for translation

      const outputText = await outputBox.textContent(); // ✅ read div
      expect(outputText).not.toBeNull();
      expect(outputText.trim().length).toBeGreaterThan(0);
    }
  });

});
