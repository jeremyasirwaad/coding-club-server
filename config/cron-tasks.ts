module.exports = {
  evaluateQuiz: {
    task: async ({ strapi }) => {
      try {


        const answerData = await strapi.entityService.findMany("api::quiz-answer.quiz-answer", {
          publicationState: "live",
          populate: "*",
        });
        answerData.forEach((data) => {
          console.log("**********CRON JOB RUNNING**********");
          let studentData = data;
          let marks = data.marks
          let studentAnswers = studentData.answers

          studentData.answers.forEach(async (answer, index) => {
            if (answer.isEvaluated == false) {
              const quizData = await strapi.entityService.findMany("api::weekly-quiz.weekly-quiz", {
                publicationState: "live",
                filters: {
                  quiz_id: answer.quiz_id
                }
              });
              if (quizData.length > 0) {
                console.log(quizData);
                if (quizData[0].ans == answer.student_ans) {
                  studentAnswers[index]["isEvaluated"] = true
                  studentAnswers[index]["iscorrect"] = true
                  marks = marks + 10;
                  console.log("first");

                } else {
                  studentAnswers[index]["isEvaluated"] = true
                  studentAnswers[index]["iscorrect"] = false
                  console.log("secind");
                }
              }

              const entry = await strapi.entityService.update("api::quiz-answer.quiz-answer", studentData.id, {
                populate: "*",
                data: {
                  answers: studentAnswers,
                  marks: marks
                }
              })
              console.log(entry);
            }
          })
        });
        console.log("**********CRON JOB ENDED**********");
      } catch (error) {
        console.log(error);

      }

    },
    options: {
      // rule: "*/10 * * * * *", // This rule runs cron job every 10sec
      rule: "0 18 * * *", // This rule runs job every day 18pm
    },
  },
};
