export const loadQuestions = async (
  amount = 10,
  category = 21,
  difficulty = "easy",
  type = "multiple"
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  try {
    const res = await fetch(url);
    const { results } = await res.json();
    return convertQuestionsFromAPI(results);
  } catch (err) {
    console.log(err);
  }
};

const convertQuestionsFromAPI = (rawQuestions) => {
  return rawQuestions.map((loadQuestion) => {
    const formattedQuestion = {
      question: loadQuestion.question,
      answerChoices: [...loadQuestion.incorrect_answers],
    };

    formattedQuestion.answer = Math.floor(Math.random() * 4);

    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      loadQuestion.correct_answer
    );
    return formattedQuestion;
  });
};
