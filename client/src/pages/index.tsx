import React, { useState, FormEvent } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("http://localhost:1337/api/validate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="uploadForm"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      method="post"
    >
      <input type="file" name="recordFile" accept=".csv,.xml" />
      <button>Submit</button>
      <span id="status">{isLoading}</span>
    </form>
  );
}
