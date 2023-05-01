import { ScanCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb"
import documentClient from "../client";

const getUsers = async () => {
    const getUsersParams: ScanCommandInput = {
        TableName: 'Users',
    }
    const command = new ScanCommand(getUsersParams);
    return await documentClient.send(command);
}

export default getUsers;