
class Fetch {
  static key = "fetch"

  static exe({body, method, url, headers, parseAs}) {
    return fetch(url, {
      method,
      headers,
      ...(!!body && {body}),
    })
      .then(async data => {
        if(!data.ok)return Promise.reject({message: `Request failed ${data.statusText ?? data.status ?? ""}`});
        //
        // if(parseAs === 'getReader') {
        //   // ensure the response body is a readable stream
        //   const reader = data.body.getReader();
        //   const decoder = new TextDecoder(); // for decoding chunks into text
        //
        //   let done = false;
        //   let result = '';
        //
        //   while (!done) {
        //     const { value, done: streamDone } = await reader.read();
        //
        //     done = streamDone;
        //
        //     if (value) {
        //       result += decoder.decode(value, { stream: true }); // decode the chunk
        //       console.log('Chunk received:', decoder.decode(value)); // process chunk
        //     }
        //   }
        //
        //   return result
        // }

        return data[parseAs]()
      })
      .then(response => {
        return response;
      })
  }

  static isSupported () {
    return true
  }
}

export default Fetch;
