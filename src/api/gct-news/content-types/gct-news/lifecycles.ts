import axios from "axios";

export default {
  async afterCreate(event: any) {
    const { result } = event
    await axios.post('https://fcm.googleapis.com/fcm/send',{
      "to": "/topics/NOTE",
      "notification": {
        "title": "News -" + result.AppTitle,
        "body": result.AppDesc,
        "sound" : "default"
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
