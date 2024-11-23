import { Observable } from "rxjs";




export function createHttpObservable(url: string) {
    // create custome observable
    return Observable.create(observer => {
      fetch(url).then( response => {
          return response.json()
          // Handling error in observer http request
          // if(response.ok) {
            
          // } else {
            observer.error('Request failed with status code:'+ response.status)
          // }
          
        }).then(body => {
          observer.next(body)
          observer.complete()
        })
        // .catch(err => {
        //   observer.error(err);
        // })
    }); 
  }

