import axios from "axios";

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization' : 'key=AAAAjOaXe4w:APA91bFN1tW_7Ol4aQg9ydD28zX8nzMr6qYj6HF27wtfctE6muF-oT9dPlt5GFuVaxgsUI1OZ92p4fuoFliJp7_P_TP4YZxXBC2RO7fdvKE1eVMMqBVyAwI1iZ0Ens7Lv8PViZqSWbNA'  },
  body: JSON.stringify({
    "to": "/topics/NOTE",
    "notification": {
      "title": "Check this Mobile (title)",
      "body": "Rich Notification testing (body)"
      }
})
};


export default {
  async afterCreate(event: any) {
    const { result } = event
    await axios.post('https://fcm.googleapis.com/fcm/send',{
      "to": "/topics/NOTE",
      "notification": {
        "title": "New Job Opportunity",
        "body": result.JobTitle,
        "sound" : "default"
        },
        "data": {
          "page":"/job",
          "url": result.Job_Poster
            },
        "android": {
              "priority": "high"
        },
        "priority": 10
  }  ,{headers: {
      Authorization: 'key=AAAAjOaXe4w:APA91bFN1tW_7Ol4aQg9ydD28zX8nzMr6qYj6HF27wtfctE6muF-oT9dPlt5GFuVaxgsUI1OZ92p4fuoFliJp7_P_TP4YZxXBC2RO7fdvKE1eVMMqBVyAwI1iZ0Ens7Lv8PViZqSWbNA',
    }}).then(res => console.log(res.data))
  }
}
