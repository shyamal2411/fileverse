import AWS from "aws-sdk";

export const publishToSns = async (message, email, result) => {
  const sns = new AWS.SNS({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });
  const params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: "Test SNS message",
    MessageAttributes: {
      email: {
        DataType: "String",
        StringValue: email,
      },
    },
  };

  try {
    const response = await sns.publish(params).promise();
    console.log("Message published to SNS:", response);
    return response;
  } catch (error) {
    console.error("Error publishing message to SNS:", error);
    throw error;
  }
};

export const subscribeToSns = async (topicArn, email) => {
  const sns = new AWS.SNS({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });
  const params = {
    Protocol: "email",
    TopicArn: topicArn,
    Endpoint: email,
  };

  try {
    const response = await sns.subscribe(params).promise();
    console.log("Subscribed to SNS:", response);
    return response;
  } catch (error) {
    console.error("Error subscribing to SNS:", error);
    throw error;
  }
};
