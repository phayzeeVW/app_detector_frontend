import { MdEdit, MdOutlineTextFields } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { GoRelFilePath } from "react-icons/go";
import type { ApplicationWithSessions } from "../../types/application.ts";
import { useEffect, useState } from "react";
import SaveSessionButton from "../core/SaveSessionButton.tsx";
import { applicationsApi } from "../../api/application_api.ts";
import Alert from "../core/Alert.tsx";

interface ApplicationDetailsProps {
  application: ApplicationWithSessions;
}

const ApplicationDetails = (props: ApplicationDetailsProps) => {
  const [editMode, setEditMode] = useState(false);
  const [application, setApplication] = useState(props.application);
  const [savedApplication, setSavedApplication] = useState(props.application);
  const [formApplication, setFormApplication] =
    useState<ApplicationWithSessions>(application);
  const [isApplicationUpdated, setIsApplicationUpdated] = useState(false);

  const isFormPropertyChanged = (property: keyof ApplicationWithSessions) => {
    return (
      savedApplication[property] !== undefined &&
      formApplication[property] !== savedApplication[property]
    );
  };

  const isTitleChanged = isFormPropertyChanged("title");
  const isPathChanged = isFormPropertyChanged("path");
  const isAliasChanged = isFormPropertyChanged("alias");
  const isSaveSessionChanged = isFormPropertyChanged("saveSession");

  useEffect(() => {
    setSavedApplication(application);
    setFormApplication(application);
  }, [application]);

  const onFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (formApplication) {
      applicationsApi.update(formApplication).then(() => {
        setSavedApplication(formApplication);
        setFormApplication(formApplication);
        setIsApplicationUpdated(true);
      });
    }
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
                setFormApplication(application);
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
            onChange={(event) =>
              setFormApplication({
                ...formApplication,
                title: event.target.value,
              })
            }
          />

          <span className="text-base-content/60 select-none">" "</span>
          <span className="text-base-content/60">Alias</span>
          <input
            id="alias"
            type="text"
            disabled={!editMode}
            value={formApplication.alias}
            className={`input ${isAliasChanged ? "input-accent" : ""}`}
            onChange={(event) =>
              setFormApplication({
                ...formApplication,
                alias: event.target.value,
              })
            }
          />

          <GoRelFilePath className="text-base-content/60 text-xl" />
          <span className="text-base-content/60">Path</span>
          <input
            id="path"
            type="text"
            value={formApplication.path}
            disabled={!editMode}
            className={`input w-full ${isPathChanged ? "input-accent" : ""}`}
            onChange={(event) =>
              setFormApplication({
                ...formApplication,
                path: event.target.value,
              })
            }
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
            onClick={() => {
              setFormApplication({
                ...formApplication,
                saveSession: !formApplication.saveSession,
              });
            }}
          />
        </div>

        <div className="flex w-full">
          <div className="flex w-full justify-end">
            <button
              disabled={!editMode}
              className="btn btn-soft btn-error mr-2"
              onClick={() => {
                setEditMode(false);
                setFormApplication(application);
              }}
            >
              Cancel
            </button>

            <button
              onClick={onFormSubmit}
              type="submit"
              disabled={
                !isTitleChanged &&
                !isPathChanged &&
                !isAliasChanged &&
                !isSaveSessionChanged
              }
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
