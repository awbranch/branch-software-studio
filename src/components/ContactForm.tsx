import { type FormEvent, useState } from "react";

function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    console.log("in On Submit");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("FormData", formData);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data: any = await response.json();
    console.log("Data", data);
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  /*
      <form>
      <div class="mb-8">
        <Label classes="mb-2" forId="first_name">Name</Label>
        <Input type="text" id="name" required />
      </div>
      <div class="mb-8">
        <Label classes="mb-2" forId="email">Email</Label>
        <Input type="email" id="email" required />
      </div>
      <div class="mb-12">
        <Label classes="mb-2" forId="message">Message</Label>
        <TextArea id="message" rows="4" />
      </div>
      <div class="text-right">
        <Button type="submit">Submit</Button>
      </div>
    </form>

  */

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="message">
          Message
          <textarea id="message" name="message" autoComplete="off" required />
        </label>
      </div>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
export default ContactForm;
