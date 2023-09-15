import axios from "axios";


module.exports = {
  popQuiz:{
    task: async ({ strapi }) => {
      console.log("**********CRON JOB Quiz Post RUNNING**********");
      try {
          const quizData = await strapi.entityService.findMany("api::weekly-quiz.weekly-quiz", {
            publicationState: "live",
          });

          // console.log(quizData);
          const id = quizData[0].id;

          const remove = await await strapi.entityService.delete("api::weekly-quiz.weekly-quiz", id);
   
        await axios.post('https://fcm.googleapis.com/fcm/send',{
      "to": "/topics/NOTE",
      "notification": {
        "title": "New Quiz Added",
        "body": "Check out the daily quiz section!",
        "sound" : "default"
        },
        "data": {
              "page":"/quiz"
            },
        "android": {
              "priority": "high"
        },
        "priority": 10
  }  ,{headers: {
      Authorization: 'key=AAAAjOaXe4w:APA91bFN1tW_7Ol4aQg9ydD28zX8nzMr6qYj6HF27wtfctE6muF-oT9dPlt5GFuVaxgsUI1OZ92p4fuoFliJp7_P_TP4YZxXBC2RO7fdvKE1eVMMqBVyAwI1iZ0Ens7Lv8PViZqSWbNA',
    }}).then(res => console.log(res.data))
        console.log("**********CRON JOB Quiz POst ENDED**********");
      } catch (error) {
        console.log(error);

      }

    },
    options: {
      // rule: "*/10 * * * * *", // This rule runs cron job every 10sec
      rule: "0 10 * * *", // This rule runs job every day 10pm
    },
  },
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
        await axios.post('https://fcm.googleapis.com/fcm/send',{
      "to": "/topics/NOTE",
      "notification": {
        "title": "Quiz Answers Published",
        "body": "Quiz results are out! Check your monthly standing in the leaderboard",
        "sound" : "default"
        },
        "data": {
              "page":"/quiz"
            },
        "android": {
              "priority": "high"
        },
        "priority": 10
  }  ,{headers: {
      Authorization: 'key=AAAAjOaXe4w:APA91bFN1tW_7Ol4aQg9ydD28zX8nzMr6qYj6HF27wtfctE6muF-oT9dPlt5GFuVaxgsUI1OZ92p4fuoFliJp7_P_TP4YZxXBC2RO7fdvKE1eVMMqBVyAwI1iZ0Ens7Lv8PViZqSWbNA',
    }}).then(res => console.log(res.data))
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
