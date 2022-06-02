const ApiResponse = (res, status, code, message, data, token) => {
  const ans = {
    input_correct: status,
    code: code,
    message,
    data: [
      {
        callback_url: "xxx",
        data: data,
        profile_process: "x/5",
        devices: [
          {
            device_type: "",
            device_ip: ""
          }

        ],
        redirect_url: "xxx",
        state_token: token
      },
    ]
  };

  if (code >= 500) {
    return res.status(500).send(ans);
  }
  return res.status(code).send(ans);

};

const ThrowError = (code, message) => {
  let error = new Error(message)
  error.code = code;
  throw error;
};

module.exports = {
  ApiResponse,
  ThrowError
}
