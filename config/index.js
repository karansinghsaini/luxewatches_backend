// const EmailTemplates = require("./sendgrid_email_templates");
// const Urls = require("./redirect_urls");
// const MasterTableIdsMapping = require("./master_tables_mapping");

module.exports = {
  APPLICATION_PROTOCOL: process.env.APPLICATION_PROTOCOL,

//   MAPPED_IDS: MasterTableIdsMapping,

  SM_CLIENT_ID: "19d6dc5f-86b8-4f55-9f64-c8c93082c4e1",
  ETHOS_CLIENT_ID: "0bc8dc7c-b5a3-4344-b313-819ppzhau6b5",
  AHURA_CLIENT_ID: "cb19c961-fc50-4613-87d9-40488220a1d9",
  NS_CLIENT_ID: "1931e809-09ff-4a1c-9718-67a1bd5ca265",
  AE_CLIENT_ID: "da1c3170-e647-11ec-9e7a-3b37506735e7",
  JWT_SECRET: "jhsrpmrkamssvskkasam",

  JWT_TOKEN_EXPIRY: "1h",

  SHARE_PRICE: 100,

  STRIPE_PROCESSING_FEE: 2.9,

  ERROR_CODES: {
    1001: "Unexpected error",
    1002: "Authorization Header Required",
    1003: "Bearer Or Token Not Found",
    1004: "Invalid Bearer Token",
    1010: "Resource Record Not Found",
    1011: "A user with the same email already exists.",
    1012: "The user is not active. Please activate",
    1013: "Invalid username or password",
    1014: "User does not Exist",
    1015: "Invalid Password",
    1016: "Activation link expired",
    1017: "User is already activated",
    1018: "OTP is Expired",
    1019: "Invalid Params",
    1031: "Email of user already exists in your Internal/External Network",
    1032: "Invitation link expired",
    1033: "Invitation has been resent to <first_name> <last_name>",
    1034: "Cannot invite yourself as network",
    1051: "Invalid gift card details",
    1052: "Card is already redeemed",
    1053: "User does not exist.",
    1054: "Invalid Email",
    1055: "Invalid Mobile No",
    1056: "Invalid Password",
    1057: "A user with the same phone number already exists.",
    1058: "Invalid Otp",
    1059: "Entered current password doesn't match",
    2000: "You cannot make an owner an admin",
    2001: "Category with the same name already exists",
    3000: "The number is unverified",
    5000: "You Don't have permission to access this API",
    3001: "Product name should not be empty",
    3002: "Product should have a description",
    3003: "Product should have category",
    3004: "Product should have some price",
    2002: "Product Type already exist",
    2003: "Product type is required",
    2004: "Full name is required",
    2005: "Campaign does not Exist",
    2006: "Assignment does not Exist",
    2007: "campaign_type_id and client_id is required",
    2008: "updated_after: invalid date format",
    2009: "Order not found",
    2010: "Campaign Id is required",
    2011: "Comment does not exist",
    2012: "You are not authorized to updated this comment",
    2013: "New and Current Password cannot be same",
    2014: "Link is either invalid or expired!",
    2015: "No Record Found",
    2016: "User not approved",
    2017: "Account setup already done",
    2018: "Unauthorized Access",
    2019: "customer already exists",
    2020: "Invalid Request Body",
    2021: "Card id is required!",
    2022: "Card Token is required!",
  },

  

  IMAGE_URLS: {
    pipelines: `https://s3-us-west-2.amazonaws.com/sharemeister-crm/email-template-assets/
    images/sm-pipeline-white.jpg`,
    sharemeister_logo: `https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/client-logos/19d6dc5f-86b8-4f55-9f64-c8c93082c4e1/main-logo.png`,
  },

  SUCCESS_MESSAGES: {
    userSignUp: "User has been registered successfully.",
    forgotPassword: "OTP has been sent to your email",
    createPassword: "Password updated successfully",
    resendConfirmationLink: "Confirmation link has been sent to your email",
    activateEmail: "Your email has been confirmed",
    activateAccount: "Account activated successfully.",
    inviteChannel: "Invited successfully",
    resourceUpdated: "Updated successfully",
    resendNetworkInvitation: "Invitation resent successfully",
    resourceDeleted: "Deleted successfully",
    profileUpdate: "Profile details updated successfully",
    deviceTokenUpdated: "Device token updated successfully",
    productCreated: "Product created successfully",
    productUpdated: "Product updated successfully",
    productHidden: "Product hidden successfully",
    categoryCreated: "Category created successfully",
    productType: "Product Type created successfully",
    categoryUpdated: "Category updated successfully",
    categoryDeleted: "Category deleted successfully",
    otpVerified: "Otp verified",
    resendOtp: "Otp resend successfully",
    userUpdated: "User updated successfully",
    sendOtp: "OTP has been sent to your mobile number",
    tagsDeleted: "Tags deleted successfully",
    groupCreated: "Group created successfully",
    groupUpdated: "Group updated successfully",
    groupDeleted: "Group deleted successfully",
    groupMemberInvite: "Members invited successfully",
    campaignMemberInvite: "Members invited successfully",
    campaignShared: "Shared successfully",
    schoolCreated: "School created successfully",
    videoWatched: "Video Watched",
    schoolUpdated: "School updated successfully",
    schoolDeleted: "School deleted successfully",
    typeUpdated: "Product type updated successfully",
    sendInvitation: "Invitation sent successfully.",
    orderCreated: "Order has been successfully placed.",
    campaignDeleted: "Campaign deleted successfully",
    assignmentDeleted: "Assignment deleted successfully",
    userReportCreated: "UserReport added successfully",
    userReportUpdated: "UserReport updated successfully",
    orderSent: "Order sent successfully",
    learningPlanCreated: "Learning plan created successfully",
    learningPlanUpdated: "Learning plan updated successfully",
    targetCreated: "New target created!",
    petUpdated: "Pet Updated!",
    petCreated: "Pet Created!",
    accountDeleted: "Account deleted successfully",
    updatePaymentMethod: "Payment Method Updated Successfully",
    deletePaymentMethod: "Payment Method Deleted Successfully",
    shippingAddressUpdated: "Shipping Address Updated successfully",
    shippingAddressDeleted: "Shipping Address Deleted successfully",
    reviewAdded: "Review Added Successfully",
    reviewUpdated: "Review Updated Successfully",
    accountSetup: "Account Setup Successfull",
    documentRemoved: "Document Removed Successfully",
    athleteRecommended: "Athlete Recommended Successfully",
  },

  NOTIFICATION_TITLES: {
    defaultMessage: "New message arrived.",
    appendedMessage: "has sent you a message",
  },

  NOTIFICATION_TYPES: {
    directMessage: "direct_message",
  },

  DEFAULT_QUERY_PARAMS: {
    limit: 100,
    offset: 0,
    order: "id",
    order_type: 1,
  },

  ORDER_TYPE: {
    1: "ASC",
    2: "DESC",
  },

  NETWORK_TYPES: {
    1: "Internal",
    2: "External",
  },

  RAISE_DETAILS: {
    base_url: process.env.RAISE_BASE_URL,
    username: process.env.RAISE_USERNAME,
    password: process.env.RAISE_PASSWORD,
    deduction: 5,
  },

  PAYOUT_DETAILS: {
    min_payable_amount_usd: 50,
  },

  PUBLISHER_NETWORKS: {
    Sharemeister: 1,
  },

  LAC_AUTHORIZATION: process.env.LAC_AUTHORIZATION,
  LAC_API_BASE_URL: process.env.LAC_API_BASE_URL,

  FIREBASE_CONFIG: {
    type: process.env.FIREBASE_TYPE || "",
    project_id: process.env.FIREBASE_PROJECT_ID || "",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
    private_key: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : "",
    client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
    client_id: process.env.FIREBASE_CLIENT_ID || "",
    auth_uri: process.env.FIREBASE_AUTH_URI || "",
    token_uri: process.env.FIREBASE_TOKEN_URI || "",
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL || "",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL || "",
  },

  CAMPAIGN_PRIORITY_RANGE: {
    1: 10,
    6: 3,
  },

  TOP_CATEGORIES: {
    1: { name: "Story", color_code: "" },
    6: { name: "Event", color_code: "" },
  },

  FIELD_TYPE_VALUES: {
    0: "radio",
    1: "checkbox",
    2: "select-one",
    3: "slider",
    4: "number",
    5: "select-many",
    6: "range",
  },

  S3_BUCKETS: {
    MEDIA_FILES: process.env.S3_MEDIA_BUCKET,
  },

  INPUT_FIELD_TYPE_VALUES: [4],

  UPPERCASE_PATTERN: /[A-Z]/,

  LOWERCASE_PATTERN: /[a-z]/,

  NUMBER_PATTER: /[0-9]/,

  SPECIAL_CHAR_PATTERN: /[!@#$%^&*]/,

  PASSWORD_LENGTH: 8,

  USER_ROLES: {
    citizen: "user",
    neighbourhood: "client",
    city: "parent",
    super_owner: "superOwner",
  },

  STATUS: {
    approved: "approved",
    pending: "pending",
    declined: "declined",
  },

  TESTIMONY_QUESTIONS: [
    "What is your personal story?",
    "What is your work story?",
    "What is your family story?",
    "What is your gospel testimony?",
  ],

  AWS_CONFIG: {
    apiVersion: "2006-03-01",
    region: "us-west-2",
    signatureVersion: "v4",
  },

  TOOLBOX_DATA: [
    {
      id: 1,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/target.svg",
      innerText:
        "I want to schedule a <strong>Discovery</strong> meeting to take ownership of my own digital community experience.",
    },
    {
      id: 2,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/mobile.svg",
      innerText:
        "I want to create a <br/><strong>Demo</strong> of my idea to scale.",
    },
    {
      id: 3,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/pen.svg",
      innerText:
        "I want to <strong>Design</strong> a landing page, home page or mobile application.",
    },
    {
      id: 4,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/code.svg",
      innerText:
        "I am in need of <strong>Development</strong> services to manage my digital asset.",
    },
    {
      id: 5,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/code-1.svg",
      innerText:
        "I am ready to <strong>Deploy</strong> my digital asset and need technical support.",
    },
    {
      id: 6,
      checked: false,
      imgPath:
        "https://sharemeister-crm-dev.s3-us-west-2.amazonaws.com/toolbox/expand.svg",
      innerText:
        "I am ready to <strong>Distribute</strong> my digital assets from my digital community applications with the marketplace.",
    },
  ],
  HELP_EMAILS: {
    NAMESILHOUETTE: {
      to: "help@namesilhouettes.com",
      from: "namesilhouettes@gmail.com",
    },
  },
  Community_Feed: {
    estate_name: "Community Feed",
    image_url:
      "https://sharemeister-crm-dev.s3.us-west-2.amazonaws.com/user_media/4442deb1-4e91-41e8-a16c-cb25eddbf3f4/1659447507972image",
  },
  Ahura_Profile_Tab_Ids: {
    learningPreferences: "c981b094-85b0-11ec-a8a3-0242ac120002",
    targets: "c981b580-85b0-11ec-a8a3-0242ac120002",
    calibrations: "c981b6d4-85b0-11ec-a8a3-0242ac120002",
    badges: "c981b7ec-85b0-11ec-a8a3-0242ac120002",
  },
};
