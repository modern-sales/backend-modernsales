import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb"
import { User } from "../../users/users.model";
import documentClient from "../client";

const putUser = (user: User) => {

    const putUserParams: PutCommandInput = {
        TableName: 'Users',
        Item: {
            PK: 'USERS',
            SK: user._id,
            primary_email: user.primary_email,
            phone_number: user.phone_number,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_picture_url: user.profile_picture_url,
            position: user.position,
            created_at: user.created_at,
            updated_at: user.updated_at,
            purchased_items: user.purchased_items
        }
    };
    const command = new PutCommand(putUserParams);
    return documentClient.send(command);
};

export default putUser;