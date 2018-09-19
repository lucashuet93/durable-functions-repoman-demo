# Durable Functions Repo Man Demo

_Note: The project is designed to be used for demo purposes only. We are not storing any data relevant to the users of the application._

The Repo Man project demonstrates orchestrator functionality found in the Durable Functions extension of the Azure Functions service. 

## How Does It Work?

The project is comprised of a Durable Function App ([source code](https://github.com/eduardolaureano/paymentdemo)) and UI that manages the orchestration process. The UI has 2 pages - one containing a form, and one that submits payments. The form collects information pertaining to billing reminders (amount owed, notification interval, and contact method) and makes a POST request to the Durable Function's orchestration client, kicking off the notification process. The orchestrator triggers a Reminder function at each notification interval that send billing reminders to the user on their preferred contact method. The message reminds the user to pay their bill, with a link to the page that submits payments. 

The orchestrator waits for a 'PaymentResponse' external event, and if it does not receive one within the notification interval window, it will trigger a subsequent billing reminder to the user via the same Reminder function. The url sent to the user linking them to the UI's payment submission page contains the orchestrators instanceId. If the user does visit the link, the payment submission page immediately sends a message with the instanceId to an Azure Queue. The Durable Function App contains an additional queue triggered function that receives the instanceId and raises the 'PaymentResponse' event, thus stopping the orchestration process.

## Running the UI

**Clone the repository**
```
git clone https://github.com/lucashuet93/durable-functions-repoman-demo.git
```
**Install dependencies**

```
npm install
```

**Add environment variables**

The application requires that you create a .env file at the project root with the following variables:

```
REACT_APP_ORCHESTRATOR_ENDPOINT=XXXXXXXXXXXXXXX
REACT_APP_AZURE_STORAGE_CONNECTION_STRING=XXXXXXXXXXXXXXX
REACT_APP_AZURE_STORAGE_QUEUE_NAME=XXXXXXXXXXXXXXX
```

**Start the UI**

```
npm start
```