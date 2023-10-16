import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import DropFile from "./DropFile";

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "basic",
    url: "",
  })
);

describe("DropFile", () => {
  let file: File;

  const openFileWizard = jest.fn();

  beforeEach(() => {
    file = new File(["content"], "file.csv", {
      type: "image/csv",
    });
    (fetch as jest.Mock).mockClear();
  });

  test("responds with a file", () => {
    const { container } = render(<DropFile getResponse={openFileWizard} />);

    fireEvent.click(container);

    expect(openFileWizard).toHaveBeenCalled();
  });

  test("upload invalid file", async () => {
    render(<DropFile getResponse={openFileWizard} />);
    let uploader = screen.getByTestId("recordFile");

    fireEvent.change(uploader!, {
      target: { files: [file] },
    });

    await waitFor(() => {
      let errorMessage = screen.getByTestId("error");
      expect(errorMessage).toHaveTextContent(
        "Cannot read properties of undefined (reading 'json')"
      );
    });

    expect(fetch).toHaveBeenCalledWith("http://localhost:1337/api/validate", {
      body: expect.any(FormData),
      method: "POST",
    });
  });
});
