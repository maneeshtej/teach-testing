import React, { useEffect, useState } from "react";
import "./sendsubstitution.css";
import { prepareForSend } from "../../utils/convert";
import { insertSubstitutions } from "../../utils/send";
import { useAlert } from "../../components/AlertContent";

function SendSubstitution({
  selectedClasses,
  setSend,
  handleNavigateAnim,
  setAnim,
}) {
  console.log(selectedClasses);

  const [convertedClasses, setConvertedClasses] = useState();
  const [response, setResponse] = useState("Confirm?");
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchConvertedClasses = () => {
      if (!selectedClasses) return;

      const { data, error } = prepareForSend(selectedClasses);

      if (error) {
        console.error("Error preparing data:", error);
        showAlert("Error preparing data", "error");
        return;
      }

      if (data) {
        setConvertedClasses(data);
      }
    };

    fetchConvertedClasses();
  }, [selectedClasses]);

  useEffect(() => {
    console.log(convertedClasses);
  }, [convertedClasses]);

  const handleInsetSubstutions = async () => {
    const { response, error } = await insertSubstitutions(convertedClasses);

    if (error) {
      setResponse(error);
      console.error(error);
      return;
    }

    if (response) {
      setResponse(response);
      console.log(response);

      showAlert("Added Substitutions", "success");

      setTimeout(() => {
        handleNavigateAnim("/home", null, setAnim, "toRight");
      }, 500);
    }
  };

  return (
    <div className="snst-wrapper" onClick={() => {}}>
      <div className="snst-window" onClick={() => {}}>
        {response}
        <div className="snst-window-buttons">
          <span
            className="snst-cancel"
            onClick={() => {
              setSend(false);
            }}
          >
            Cancel
          </span>
          <span
            className="snst-send"
            onClick={() => {
              handleInsetSubstutions();
            }}
          >
            Send
          </span>
        </div>
      </div>
    </div>
  );
}

export default SendSubstitution;
