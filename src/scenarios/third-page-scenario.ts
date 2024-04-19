import { By, until, WebDriver,Builder } from "selenium-webdriver";
import { Select } from "selenium-webdriver/lib/select";
import { ApplyCategory, ApplyPurpose, ApplyReason } from "../config";
import { DEFAULT_TIMEOUT } from "../const";
import { Utils } from "../utils";
// const CaptchaSolver = require("captcha-solver");





export class ThirdPageScenario {
  static async setCitizenship(wd: WebDriver, to: string) {
    const citizenshipSelector = new Select(
      await Utils.waitUntilVisible(wd, By.xpath('//*[@id="xi-sel-400"]'))
    );
    await wd.sleep(400);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const i of Array(5)) {
      const opts = await citizenshipSelector.getOptions();
      if (opts.length === 184) {
        break;
      }
      await wd.sleep(200);
    }
    await citizenshipSelector.selectByVisibleText(to);
  }

  static async setNumberOfPeople(wd: WebDriver, to: string) {
    const numberOfPeople = new Select(
      await Utils.waitUntilVisible(wd, By.xpath('//*[@id="xi-sel-422"]'))
    );
    await wd.sleep(400);
    await numberOfPeople.selectByVisibleText(to);
  }

  static async setLiveWith(wd: WebDriver, to: string) {
    const liveWith = new Select(
      await Utils.waitUntilVisible(wd, By.xpath('//*[@id="xi-sel-427"]'))
    );
    await wd.sleep(400);
    await liveWith.selectByVisibleText(to);
  }

  static async selectDate(wd: WebDriver) {
    const selectDay = await Utils.waitUntilVisible(
      wd,
      By.css('td[data-handler="selectDay"][data-event="click"] a')
    );
    await wd.sleep(400);

    await selectDay.click();

//     const reCAPTCHA =  await Utils.waitUntilVisible(wd, By.xpath('//*[@id="recaptcha-anchor"]'))



 
  }


  static async selectApplyReason(wd: WebDriver, reason: ApplyReason) {
    const reasonToText: { [key: string]: string } = {
      economic: "Economic activity",
      family: "Family reasons",
      educational: "Educational purposes",
    };
    if (reason === "empty") {
      return;
    }
    const text = reasonToText[reason];
    if (!text) {
      throw new Error("Apply reason is not valid");
    }
    const label = await Utils.waitUntilVisible(
      wd,
      // economic activity
      By.xpath(
        `//*[@class="level1-content"]//label[normalize-space()="${text}"]`
      )
    );
    await wd.sleep(400);
    await label.click();
  }

  static async selectApplyPurpose(
    wd: WebDriver,
    purpose: keyof typeof ApplyPurpose
  ) {
    const text = ApplyPurpose[purpose];
    if (!text) {
      throw new Error("Apply purpose is not valid");
    }
    const input = await Utils.waitUntilVisible(
      wd,
      // EU Blue card
      By.xpath(
        `//*[@class="level2-content"]//label[normalize-space()="${text}"]`
      )
    );
    await wd.sleep(400);
    await input.click();
    const inputname = await Utils.waitUntilVisible(
      wd,
      By.xpath(`//input[@id="xi-tf-999"]`)
    );

    await inputname.sendKeys("ismli");
    await this.clickNext(wd);
  }

  static async clickNext(wd: WebDriver) {
    const nextButtonPath = '//*[@id="applicationForm:managedForm:proceed"]';
    const button = await Utils.waitUntilVisible(wd, By.xpath(nextButtonPath));
    await wd.sleep(400);
    await button.click();
  }

  static async waitForLoadingScreen(wd: WebDriver) {
    const loading = await Utils.waitUntilVisible(wd, By.className("loading"));
    await wd.wait(until.elementIsNotVisible(loading), DEFAULT_TIMEOUT);
    await wd.sleep(400);
    await wd.wait(until.elementIsNotVisible(loading), DEFAULT_TIMEOUT);
    await wd.sleep(400);
  }
}



// <iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-y8msf71iz2ja" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LeYPA8mAAAAAKWCWvy5U5jq-CqIFrVoimW034zI&amp;co=aHR0cHM6Ly9vdHYudmVyd2FsdC1iZXJsaW4uZGU6NDQz&amp;hl=de&amp;v=QquE1_MNjnFHgZF4HPsEcf_2&amp;size=normal&amp;cb=fcieazvbnv28"></iframe>