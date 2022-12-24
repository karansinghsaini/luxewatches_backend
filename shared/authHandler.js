const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const Feature = require("../services/features");

/* global Config, Util, Models */

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(400).send(Util.error(1002));

  if (!token.startsWith("Bearer "))
    return res.status(400).send(Util.error(1003));

  token = token.slice(7, token.length);

  if (Util.isEmpty(token)) return res.status(400).send(Util.error(1003));

  jwt.verify(
    token,
    Config.JWT_SECRET,
    { ignoreExpiration: true },
    (err, decoded) => {
      if (err) {
        return res.status(401).send(Util.error(1004));
      }
      req.decoded = decoded;
      next();
    }
  );
};

const verifyRestApiUser = (req, res, next) => {
  if (!req.headers.accesskey && !req.headers.secretkey)
    return res.status(400).send(Util.error(1002));
  Models.User.findOne({
    where: {
      access_key: req.headers.accesskey,
    },
    attributes: ["id", "secret_key"],
  }).then((user) => {
    if (!user) {
      return res.status(401).send(Util.error(1004));
    }

    // bcrypt.compare(req.headers.secretkey,
    //   user.dataValues.secret_key).then((result) => {
    //   if (!result) {
    //     return res.status(401).send(Util.error(1004));
    //   }

    //   next();
    // });
    if (req.headers.secretkey === user.dataValues.secret_key) {
      next();
    } else return res.status(401).send(Util.error(1004));
  });
};

const generateToken = async (
  userId,
) => {
  // const data = await UserClient.getUserClientRole(userId);

  // const token = data ? jwt.sign({
  //   id: userId,
  //   email: userEmail,
  //   user_id: data.user_id,
  //   client_id: data.client_id,
  //   role: data.role,
  //   roles_id: data.roles_id,
  // }, Config.JWT_SECRET, {
  //   expiresIn: Config.JWT_TOKEN_EXPIRY,
  // }) :
  //  const token = jwt.sign({
  //   id: userId,
  //   email: userEmail,
  // }, Config.JWT_SECRET, {
  //   expiresIn: Config.JWT_TOKEN_EXPIRY,
  // });

  const token = jwt.sign(
    {
      id: userId,
    },
    Config.JWT_SECRET,
    {
      expiresIn: Config.JWT_TOKEN_EXPIRY,
    }
  );

  return token;
};

const generateEmailToken = async (userId, userEmail, type) => {
  // const data = await UserClient.getUserClientRole(userId);

  // const token = data ? jwt.sign({
  //   id: userId,
  //   email: userEmail,
  //   user_id: data.user_id,
  //   client_id: data.client_id,
  //   role: data.role,
  //   roles_id: data.roles_id,
  // }, Config.JWT_SECRET, {
  //   expiresIn: Config.JWT_TOKEN_EXPIRY,
  // }) :
  //  const token = jwt.sign({
  //   id: userId,
  //   email: userEmail,
  // }, Config.JWT_SECRET, {
  //   expiresIn: Config.JWT_TOKEN_EXPIRY,
  // });

  const token = jwt.sign(
    {
      id: userId,
      email: userEmail,
      type: type,
    },
    Config.JWT_SECRET,
    {
      expiresIn: Config.JWT_TOKEN_EXPIRY,
    }
  );

  return token;
};

const havePermission = async (req, res, next, features) => {
  let token = req.headers.authorization;
  if (!token) return res.status(400).send(Util.error(1002));

  if (!token.startsWith("Bearer "))
    return res.status(400).send(Util.error(1003));

  token = token.slice(7, token.length);

  if (Util.isEmpty(token)) return res.status(400).send(Util.error(1003));

  jwt.verify(
    token,
    Config.JWT_SECRET,
    { ignoreExpiration: true },
    (err, decoded) => {
      if (err) {
        return res.status(401).send(Util.error(1004));
      }
      req.decoded = decoded;
    }
  );

  const userClientId = req.decoded.id;
  const params = {
    where: {
      user_clients_id: userClientId,
    },
    attributes: ["roles_id"],
  };

  const result = await Models.UserClientRole.findOne(params);
  const featuresArr = await Feature.getShortCodeByRoleId(result.roles_id);

  const isPermitted = features.every((element) =>
    featuresArr.includes(element)
  );

  if (!isPermitted) return res.status(403).send(Util.error(5000));

  next();
};

module.exports = {
  verifyToken,
  generateToken,
  verifyRestApiUser,
  havePermission,
  generateEmailToken,
};
