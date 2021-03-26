const axios = require('axios');
const config = require('./config.js');

const headers = {
  headers: {
    Authorization: `${config.token}`,
  },
};

const getQnA = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${req.params.product_id}&count=100`;
  const url = `http://3.101.118.94/api/qa/questions/${req.params.product_id}`;

  axios.get(url, headers)
    .then((res) => {
      console.log('res.data', res.data)
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

const postQuestion = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${req.params.product_id}`;
  const url = `http://3.101.118.94/api/qa/questions/${req.params.product_id}`

  axios.post(url, req.body, headers)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err)
    })
}

const postAnswer = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/answers`;
  const url = `http://3.101.118.94/api/qa/questions/${req.params.question_id}/answers`;

  axios.post(url, req.body, headers)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err)
    })
}

const getAnswers = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/answers?count=100`;
  const url = `http://3.101.118.94/api/qa/questions/${req.params.question_id}/answers?count=100`;

  axios.get(url, headers)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
  }

const reportAnswer = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${req.params.answer_id}/report`
  const url = `http://3.101.118.94/api/qa/answers/${req.params.answer_id}/report`


  axios.put(url, req.body, headers)
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err)
  });
}

const reportQuestion = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/report`
  const url = `http://3.101.118.94/api/qa/questions/${req.params.question_id}/report`

  axios.put(url, req.body, headers)
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err)
  });
}

  const voteHelpful = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${req.params.answer_id}/helpful`
  const url = `http://3.101.118.94/api/qa/answers/${req.params.answer_id}/helpful`

  axios.put(url, req.body, headers)
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err)
  });
}

const voteQuestionHelpful = (req, callback) => {
  // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/helpful`
  const url = `http://3.101.118.94/api/qa/questions/${req.params.question_id}/helpful`

  axios.put(url, req.body, headers)
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err)
  });
}


module.exports = {
  getQnA,
  getAnswers,
  postAnswer,
  postQuestion,
  reportAnswer,
  voteHelpful,
  voteQuestionHelpful,
  reportQuestion
}