

(() => {

    const form = document.querySelector('form');
    const formResponse = document.querySelector('js-form-response');
  
    form.onsubmit = e => {
      
      e.preventDefault();
  
      const data = {};

      const formElements = Array.from(form);

      formElements.map(input => {
          input.value !== '' ? data[input.name] = input.value : false
      });
  
      // Log what our lambda function will receive
      console.log(JSON.stringify(data));

      fetch('https://dwxt1f2tse.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
      })

    };
  })();

  // "User `arn:aws:sts::801906911770:assumed-role/static-site-mailer-dev-us-east-1-lambdaRole/static-site-mailer-dev-staticSiteMailer' is not authorized to perform `ses:SendEmail' on resource `arn:aws:ses:us-east-1:801906911770:identity/zachariahcrowell@gmail.com'"