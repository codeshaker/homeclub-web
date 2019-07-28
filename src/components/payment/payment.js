import React, { Component } from "react";

class Payment extends Component {
  state = {
    amount: ""
  };

  paymentClient = null;

  baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
  };

  allowedCardNetworks = [
    "AMEX",
    "DISCOVER",
    "INTERAC",
    "JCB",
    "MASTERCARD",
    "VISA"
  ];

  allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

  tokenizationSpecification = {
    type: "PAYMENT_GATEWAY",
    parameters: {
      gateway: "example",
      gatewayMerchantId: "example123"
    }
  };

  baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
      allowedAuthMethods: this.allowedCardAuthMethods,
      allowedCardNetworks: this.allowedCardNetworks
    }
  };

  cardPaymentMethod = Object.assign({}, this.baseCardPaymentMethod, {
    tokenizationSpecification: this.tokenizationSpecification
  });

  getGoogleIsReadyToPayRequest = () => {
    return Object.assign({}, this.baseRequest, {
      allowedPaymentMethods: [this.baseCardPaymentMethod]
    });
  };

  getGooglePaymentDataRequest = () => {
    const paymentDataRequest = Object.assign({}, this.baseRequest);
    paymentDataRequest.allowedPaymentMethods = [this.cardPaymentMethod];
    paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
      // @todo a merchant ID is available for a production environment after approval by Google
      // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
      // merchantId: '01234567890123456789',
      merchantName: "Example Merchant"
    };

    paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];

    return paymentDataRequest;
  };

  getGooglePaymentsClient = () => {
    if (this.paymentsClient == null) {
      /* eslint-disable */
      this.paymentsClient = new google.payments.api.PaymentsClient({
        environment: "TEST",
        paymentDataCallbacks: {
          onPaymentAuthorized: this.onPaymentAuthorized
        }
      });
    }
    return this.paymentsClient;
  };

  onPaymentAuthorized = paymentData => {
    return new Promise(function(resolve, reject) {
      // handle the response
      this.processPayment(paymentData)
        .then(function() {
          resolve({ transactionState: "SUCCESS" });
        })
        .catch(function() {
          resolve({
            transactionState: "ERROR",
            error: {
              intent: "PAYMENT_AUTHORIZATION",
              message: "Insufficient funds",
              reason: "PAYMENT_DATA_INVALID"
            }
          });
        });
    });
  };

  onGooglePayLoaded = () => {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
      .isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function(response) {
        if (response.result) {
          addGooglePayButton();
        }
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
  };

  addGooglePayButton = () => {
    const paymentsClient = getGooglePaymentsClient();
    const button = paymentsClient.createButton({
      onClick: onGooglePaymentButtonClicked
    });
    document.getElementById("container").appendChild(button);
  };

  getGoogleTransactionInfo = () => {
    return {
      displayItems: [
        {
          label: "Subtotal",
          type: "SUBTOTAL",
          price: "11.00"
        },
        {
          label: "Tax",
          type: "TAX",
          price: "1.00"
        }
      ],
      currencyCode: "INR",
      totalPriceStatus: "FINAL",
      totalPrice: "0.01",
      totalPriceLabel: "Total"
    };
  };

  onGooglePaymentButtonClicked = () => {
    const paymentDataRequest = this.getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();

    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest);
  };

  processPayment(paymentData) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        // @todo pass payment token to your gateway to process payment
        paymentToken = paymentData.paymentMethodData.tokenizationData.token;

        resolve({});
      }, 3000);
    });
  }

  render() {
    const paymentsClient =
      /* eslint-disable */
      new google.payments.api.PaymentsClient({ environment: "TEST" });
    var button = paymentsClient.createButton({
      onClick: () => {
        debugger;
        console.log("onGooglePaymentButtonClicked clicked");
      },
      buttonColor: "white"
    });

    let handleChange = e => {
      e.preventDefault();
      console.log("handle change called");
      this.setState({
        [e.target.id]: e.target.value
      });
    };

    return (
      <div className="container">
        <div className="input-field">
          <label htmlFor="currency">Amount</label>
          <input type="number" id="amount" onChange={this.handleChange} />
        </div>
        <button
          type="button"
          onClick={this.onGooglePaymentButtonClicked}
          aria-label="Google Pay"
          class="gpay-button white long"
        />
      </div>
    );
  }
}

export default Payment;
