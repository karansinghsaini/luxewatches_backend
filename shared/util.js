// module.exports=class Util{
//     static filterUndefinedValues(object) {
//     if (!object && object.constructor.name !== "Object") {
//         return object;
//     }
//     const returnObject = {};

//     /* Iterate over keys and filter out the falsy values in object. */
//     Object.keys(object).forEach((key) => {
//         if (object[key] !== undefined) {
//             returnObject[key] = object[key];
//         }
//     });

//     return returnObject;
// }
// }

/* global Config */
const Request = require("request");
const XLSX = require("xlsx");
const validator = require("validator");
const moment = require("moment");

class Util {
  static success(data, successMessage = null) {
    if (
      data.constructor.name !== "Object" &&
      data.constructor.name !== "Array"
    ) {
      data = data.get({ plain: true });
    }

    const successResp = data;

    if (successMessage) successResp.message = successMessage;

    return successResp;
  }

  static downloadCsv(req, res, fileName) {
    try {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + "download-" + Date.now() + '.csv"'
      );
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Pragma", "no-cache");

      res.download(fileName);
    } catch (e) {
      res.status(400).send(Util.error(1019));
    }
  }

  static genearteCsv(moduleName, sheetName, listData, headers) {
    let initialValue = 64;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(listData);

    wb.SheetNames.push(sheetName);
    headers.map((item) => {
      initialValue += 1;
      const cloumnName = `${String.fromCharCode(initialValue)}1`;
      delete ws[cloumnName].w;
      ws[cloumnName].v = item;
      return ws;
    });

    wb.Sheets[sheetName] = ws;
    const tag = Util.getTimestamp();
    const fileName = `${sheetName}_${tag}.csv`;

    XLSX.writeFile(wb, `temp/${moduleName}/${fileName}`);

    return tag;
  }

  static getFourDigitRandomNo() {
    const minm = 1000;
    const maxm = 9999;

    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  static isEmpty(object) {
    if (!object) {
      return true;
    }

    const className = object.constructor.name;
    let status = true;

    switch (className) {
      case "String":
        status = object.trim().length === 0;
        break;

      case "Number":
        status = false;
        break;

      case "Array":
        status = object.length === 0;
        break;

      case "Object":
        status = Object.keys(object).length === 0;
        break;

      default:
    }

    return status;
  }

  static deepCloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static filterUndefinedValues(object) {
    if (!object && object.constructor.name !== "Object") {
      return object;
    }
    const returnObject = {};

    /* Iterate over keys and filter out the falsy values in object. */
    Object.keys(object).forEach((key) => {
      if (object[key] !== undefined) {
        returnObject[key] = object[key];
      }
    });

    return returnObject;
  }

  static error(errorCode, errorMessage) {
    if (Util.isEmpty(errorCode)) errorCode = 1001;
    if (Util.isEmpty(errorMessage))
      errorMessage = Config.ERROR_CODES[errorCode] || "Invalid Request";

    return {
      error: { code: errorCode, message: errorMessage },
    };
  }

  static sendExceptionResponse(res, error) {
    // console.log("Res in sendExceptionResponse", res);
    if (error && !Util.isEmpty(error.errorCode))
      return res.status(400).send(Util.error(error.errorCode));

    return res.status(500).send(Util.error(1001));
  }

  static encode64(string) {
    return Buffer.from(string).toString("base64");
  }

  static getTime() {
    return new Date();
  }

  static getTimestamp() {
    return new Date().getTime();
  }

  static decode64(base64String) {
    return Buffer.from(base64String, "base64").toString();
  }

  static isPhoneNoValid(phoneNo) {
    return validator.isMobilePhone(
      phoneNo,
      [
        "ar",
        "ar-AE",
        "ar-BH",
        "ar-DZ",
        "ar-EG",
        "ar-IQ",
        "ar-JO",
        "ar-KW",
        "ar-LB",
        "ar-LY",
        "ar-MA",
        "ar-QA",
        "ar-QM",
        "ar-SA",
        "ar-SD",
        "ar-SY",
        "ar-TN",
        "ar-YE",
        "bg-BG",
        "cs-CZ",
        "da-DK",
        "de-DE",
        "el-GR",
        "en-AU",
        "en-GB",
        "en-HK",
        "en-IN",
        "en-NZ",
        "en-US",
        "en-ZA",
        "en-ZM",
        "es-ES",
        "fr-FR",
        "hu-HU",
        "it-IT",
        "ku-IQ",
        "nb-NO",
        "nl-NL",
        "nn-NO",
        "pl-PL",
        "pt-BR",
        "pt-PT",
        "ru-RU",
        "sl-SI",
        "sk-SK",
        "sr-RS",
        "sr-RS@latin",
        "sv-SE",
        "tr-TR",
        "uk-UA",
      ],
      { strictmode: true }
    );
  }

  /**
      * @param {Object}
        personalizations key to get the template substitutions
        templateId key to get the template information from constants
      */
  static sendEmailBySendgrid(params) {
    let emailData = { ...Config.SENDGRID_REQUEST };
    emailData.personalizations = params.personalizations;
    emailData.template_id = params.templateId;
    if (params.from_email) emailData.from.email = params.from_email;
    if (params.attachments) emailData.attachments = params.attachments;

    console.log("emaildata in sendEmailBySendGrid::::::::", emailData);
    const requestData = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      url: Config.SENDGRID_BASE_URL + Config.SENDGRID_SEND_MAIL_URL,
      body: emailData,
      json: true,
    };
    Request.post(requestData, (error, response, body) => {
      console.log("request : ", requestData.headers.Authorization);
      console.log("response : ", JSON.stringify(response));

      if (error) {
        console.log("response : ", JSON.stringify(error));
        // TODO Send Email to Developer on Exception
        console.log(`Send Email Failed.${error}${response}${body}`);
      }
    });
  }

  static sendEmailBySendgridForAE(params) {
    let emailData = { ...Config.SENDGRID_REQUEST_AE };
    emailData.personalizations = params.personalizations;
    emailData.template_id = params.templateId;
    if (params.from_email) emailData.from.email = params.from_email;
    if (params.attachments) emailData.attachments = params.attachments;

    console.log("emaildata in sendEmailBySendGrid::::::::", emailData);
    const requestData = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      url: Config.SENDGRID_BASE_URL + Config.SENDGRID_SEND_MAIL_URL,
      body: emailData,
      json: true,
    };
    Request.post(requestData, (error, response, body) => {
      console.log("request : ", requestData.headers.Authorization);
      console.log("response : ", JSON.stringify(response));

      if (error) {
        console.log("response : ", JSON.stringify(error));
        // TODO Send Email to Developer on Exception
        console.log(`Send Email Failed.${error}${response}${body}`);
      }
    });
  }

  static formatAmount(amount) {
    return Math.abs(amount).toFixed(2);
  }

  static prepareErrorMessage(errorMessage, messageFields) {
    Object.keys(messageFields).forEach((field) => {
      errorMessage = errorMessage
        .split(`<${field}>`)
        .join(messageFields[field]);
    });

    return errorMessage;
  }

  static removeNewLines(url) {
    return url.replace(/\s/g, "");
  }

  static setQueryDataPreviewURLs(campaign) {
    campaign.preview_image_url = !Util.isEmpty(campaign.embedded_image_link)
      ? campaign.embedded_image_link
      : campaign.image_url;

    if (!Util.isEmpty(campaign.embedded_video_link))
      campaign.preview_video_url = campaign.embedded_video_link;
    else if (!Util.isEmpty(campaign.video_url))
      campaign.preview_video_url = campaign.video_url;
    else campaign.preview_video_url = "";
  }

  static getArrDiff(array1, array2) {
    let obj = {
      commonElements: [],
      firstElements: [],
      secondElements: [],
    };

    obj.commonElements = [
      ...new Set(array1.filter((value) => array2.includes(value))),
    ];
    obj.firstElements = [
      ...new Set(array2.filter((value) => !array1.includes(value))),
    ];
    obj.secondElements = [
      ...new Set(array1.filter((value) => !array2.includes(value))),
    ];
    return obj;
  }

  static validatePassword(password) {
    if (!this.isEmpty(password)) {
      return {
        hasUpper: Config.UPPERCASE_PATTERN.test(password),
        hasLower: Config.LOWERCASE_PATTERN.test(password),
        hasNumber: Config.NUMBER_PATTER.test(password),
        hasSpecial: Config.SPECIAL_CHAR_PATTERN.test(password),
        lengthValid: password.length >= Config.PASSWORD_LENGTH,
      };
    }
  }

  static isPasswordValid(password) {
    return (
      password.hasUpper &&
      password.hasLower &&
      password.hasNumber &&
      password.hasSpecial &&
      password.lengthValid
    );
  }

  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  // stripe nextBillingDate
  static dateOneMonthFromNow() {
    const date = new Date();
    const currentMonth = date.getMonth();
    date.setMonth(currentMonth + 1);
    date.setDate(1);
    date.setHours(0, 0, 0);
    return Math.floor(date.getTime() / 1000.0);
  }

  // stripe startDate
  static dateFirstDayOfMonth() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0);
    return Math.floor(date.getTime() / 1000.0);
  }

  // change day and month of date
  // date format: Jan 04, 2021
  static dynamicDayMonth(day, month) {
    const date = new Date();
    const currentMonth = date.getMonth();
    if (month) date.setMonth(currentMonth + month);
    if (day) date.setDate(day);
    date.setHours(0, 0, 0);
    return moment(date).format("MMM DD, YYYY");
  }

  static paintUptoTwoDecimalPlaces(num) {
    const number = Number(num);
    if (number % 1 != 0) {
      return (Math.round(parseFloat(num) * 100) / 100).toFixed(2);
    } else return number.toString();
  }
}

module.exports = Util;
