import React from "react";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";
import moment from "moment";

import {setUpdateLoader} from "../../../actions/taskActions";
import {
  claimTask,
  getTaskDetail,
  unClaimTask
} from "../../../apiManager/services/taskServices";

const taskStatus = (task) => {
  switch (task.status) {
    case "completed":
      return (
        <label className="text-success font-weight-bold text-capitalize task-btn">
          {"Completed"}
        </label>
      );
    default:
      return (
        <label className="text-primary font-weight-bold text-capitalize task-btn">
          {"Active"}
        </label>
      );
  }
};

const View = (props) => {
  const task = props.detail;
  return (
    <Table responsive>
      <tbody>
      <tr>
        <td className="border-0">Task Title</td>
        <td className="border-0">:</td>
        <td className="border-0">{task.name}</td>
      </tr>
      <tr>
        <td className="border-0">Task Assignee</td>
        <td className="border-0">:</td>
        <td className="border-0 d-inline-flex">
          {task.assignee}
          {task.assignee ? (
            task.assignee === props.userName &&
            props.detail.status !== "completed" ? (
              <p
                className="mb-0 ml-3"
                onClick={() => props.onUnclaim(task.id)}
              >
                Unassign
              </p>
            ) : null
          ) : (
            <p
              className="mb-0"
              onClick={() => props.onClaim(task.id, props.userName)}
            >
              Assign to me
            </p>
          )}
        </td>
      </tr>
      <tr>
        <td className="border-0">Task Status</td>
        <td className="border-0">:</td>
        <td className="border-0">{taskStatus(task)}</td>
      </tr>
      <tr>
        <td className="border-0">Application Id</td>
        <td className="border-0">:</td>
        <td className="border-0">{task.application_id}</td>
        {/*TODO update*/}
      </tr>
      <tr>
        <td className="border-0">Application Name</td>
        <td className="border-0">:</td>
        <td className="border-0">{task.form_name || "---"}</td>
      </tr>
      <tr>
        <td className="border-0">Applicant</td>
        <td className="border-0">:</td>
        <td className="border-0">{task.submitter_name || "---"}</td>
      </tr>
      <tr>
        <td className="border-0">Application Status</td>
        <td className="border-0">:</td>
        <td className="border-0">{task.application_status || "---"}</td>
      </tr>
      <tr>
        <td className="border-0">Submitted On</td>
        <td className="border-0">:</td>
        <td className="border-0">
         {new Date(task.submission_date).toLocaleString()}
        </td>
      </tr>
      <tr>
        <td className="border-0">Due date</td>
        <td className="border-0">:</td>
        <td className="border-0">
          {task.due ? (
            moment(task.due).format("DD-MMM-YYYY")
          ) : (
            <p className="mb-0">Set due date</p>
          )}
        </td>
      </tr>
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.tasks.taskDetail,
    userName: state.user.userDetail.preferred_username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onClaim: (id, userName) => {
      dispatch(setUpdateLoader(true));
      dispatch(
        claimTask(id, userName, (err, res) => {
          if (!err) {
            dispatch(
                getTaskDetail(id, (err, res) => {
                  if (!err) {
                    dispatch(setUpdateLoader(false));
                  }
                })
              );
          } else {
            dispatch(setUpdateLoader(false));
          }
        })
      );
    },
    onUnclaim: (id) => {
      dispatch(setUpdateLoader(true));
      dispatch(
        unClaimTask(id, (err, res) => {
          if (!err) {
            dispatch(
              getTaskDetail(id, (err, res) => {
                dispatch(setUpdateLoader(false));
              })
            );
          } else {
            dispatch(setUpdateLoader(false));
          }
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
