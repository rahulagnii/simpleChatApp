const messageBody = $("#message-body");
const messageForm = $("#message-form");

const renderMessageLeft = (doc) => {
  messageBody.append(
    '<tr><th class="text-left"><label class="badge rounded-pill">' +
      doc.data().message +
      "</label></th></tr>"
  );
};
const renderMessageRight = (doc) => {
  messageBody.append(
    '<tr><th class="text-right"><label class="badge rounded-pill">' +
      doc.data().message +
      "</label></th></tr>"
  );
};

db.collection("messages").onSnapshot((snapshot) => {
  let messages = snapshot.docChanges();
  messages.forEach((message) => {
    if (message.type === "added") {
      if (message.doc.data().name === "Rahul") {
        renderMessageLeft(message.doc);
      } else if (message.doc.data().name === "Aravind") {
        renderMessageRight(message.doc);
      }
    }
  });
});

messageForm.submit((e) => {
  e.preventDefault();
  db.collection("messages").add({
    name: $("input[name*='name']").val(),
    message: $("input[name*='message']").val(),
    created: firebase.firestore.Timestamp.now(),
  });
  document.getElementById("message-form").reset();
});
