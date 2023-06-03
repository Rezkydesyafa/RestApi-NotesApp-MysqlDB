exports.success = (payload, message, res) => {
  const datas = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload: payload || null,
  };
  res.json(datas);
  res.end();
};

exports.error = (message, statusCode, res) => {
  const data = {
    success: false,
    statusCode: statusCode,
    error: {
      message,
    },
  };
  // console.log(data);
  res.json(data);
  res.end();
};
