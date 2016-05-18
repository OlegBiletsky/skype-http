import * as Bluebird from "bluebird";
import {Incident} from "incident";

import {ApiContext} from "../interfaces/api-context";
import * as io from "../interfaces/io";
import * as apiUri from "../api-uri";

export function acceptContactRequest (io: io.IO, apiContext: ApiContext, contactUsername: string): Bluebird<any> {
  return Bluebird
    .try(() => {
      const requestOptions: io.GetOptions = {
        uri: apiUri.authRequestAccept(apiContext.username, contactUsername),
        jar: apiContext.cookieJar,
        headers: {
          "X-Skypetoken": apiContext.skypeToken.value
        }
      };
      return io.put(requestOptions);
    })
    .then((res: io.Response) => {
      if (res.statusCode !== 201) {
        return Bluebird.reject(new Incident("net", "Failed to accept contact"));
      }
      const body: any = JSON.parse(res.body);
      return Bluebird.resolve(null);
    });
}

export default acceptContactRequest;
