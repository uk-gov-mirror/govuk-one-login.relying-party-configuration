import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyResult, Handler } from "aws-lambda";

export const handler: Handler = async (): Promise<APIGatewayProxyResult> => {
  const dynamoClient = new DynamoDBClient({
    region: "eu-west-2",
  });

  const docClient = DynamoDBDocument.from(dynamoClient);
  const tables = await docClient.send(new ListTablesCommand());
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello World`,
      tables,
    }),
  });
};
