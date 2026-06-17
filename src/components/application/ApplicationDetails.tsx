import { MdEdit, MdOutlineTextFields } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { GoRelFilePath } from "react-icons/go";
import type { ApplicationWithSessions } from "../../types/application.ts";
import { useState } from "react";
import SaveSessionButton from "../core/SaveSessionButton.tsx";
import Alert from "../core/Alert.tsx";
import { useApplicationEditForm } from "../../hooks/useApplicationEditForm.tsx";

interface ApplicationDetailsProps {
  application: ApplicationWithSessions;
}

const ApplicationDetails = (props: ApplicationDetailsProps) => {
  const [editMode, setEditMode] = useState(false);

  const {
    formApplication,
    isTitleChanged,
    isPathChanged,
    isAliasChanged,
    isSaveSessionChanged,
    isApplicationUpdated,
    setIsApplicationUpdated,
    isDirty,
    updateField,
    resetForm,
    submitForm,
  } = useApplicationEditForm({
    application: props.application,
  });

  const onFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    void submitForm();
  };

  return (
    <div className="card bg-base-100 shadow-sm mb-6">
      <div className="card-body">
        <div className="flex w-full">
          <h2 className="card-title">Details</h2>

          <div className="flex w-full justify-end">
            <div
              onClick={() => {
                setEditMode(!editMode);
                resetForm();
              }}
              className={`btn btn-soft btn-circle rounded-md btn-info ${editMode ? "btn-active" : ""}`}
            >
              <MdEdit size={25} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-2 mt-2 items-center">
          <FaHashtag className="text-base-content/60" />
          <span className="text-base-content/60">ID</span>
          <span>{props.application.id}</span>

          <MdOutlineTextFields className="text-base-content/60" />
          <span className="text-base-content/60">Title*</span>
          <input
            id="title"
            type="text"
            value={formApplication.title}
            disabled={!editMode}
            className={`input ${isTitleChanged ? "input-accent" : ""}`}
            onChange={(event) => updateField("title", event.target.value)}
          />

          <span className="text-base-content/60 select-none">" "</span>
          <span className="text-base-content/60">Alias</span>
          <input
            id="alias"
            type="text"
            disabled={!editMode}
            value={formApplication.alias}
            className={`input ${isAliasChanged ? "input-accent" : ""}`}
            onChange={(event) => updateField("alias", event.target.value)}
          />

          <GoRelFilePath className="text-base-content/60 text-xl" />
          <span className="text-base-content/60">Path</span>
          <input
            id="path"
            type="text"
            value={formApplication.path}
            disabled={!editMode}
            className={`input w-full ${isPathChanged ? "input-accent" : ""}`}
            onChange={(event) => updateField("path", event.target.value)}
          />

          <FaHashtag className="text-base-content/60" />
          <span className="text-base-content/60">RAWG Game ID</span>
          <span>{props.application.rawgGameId}</span>

          <span></span>
          <span className="text-base-content/60">Visibility</span>
          <SaveSessionButton
            className={`w-fit ${isSaveSessionChanged ? "border-accent" : ""}`}
            disabled={!editMode}
            visibility={formApplication.saveSession}
            onClick={() =>
              updateField("saveSession", !formApplication.saveSession)
            }
          />
        </div>

        <div className="flex w-full">
          <div className="flex w-full justify-end">
            <button
              disabled={!editMode}
              className="btn btn-soft btn-error mr-2"
              onClick={() => {
                resetForm();
                setEditMode(false);
              }}
            >
              Cancel
            </button>

            <button
              onClick={onFormSubmit}
              type="submit"
              disabled={!isDirty}
              className="btn btn-soft btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {isApplicationUpdated && (
        <Alert
          className="mt-4 alert-soft shadow-xl"
          type="success"
          message="Application updated successfully!"
          onClose={() => setIsApplicationUpdated(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default ApplicationDetails;
