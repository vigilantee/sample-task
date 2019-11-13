import React from "react";
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Input
} from "reactstrap";

import tasks from './tasks';
import Table from "./Table.jsx";


class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            metaTaskName: "",
            isEditingTaskName: false
        };
        console.log("tasks are.....", tasks);
    }

    renderLabel = (label = "label", htmlFor = `exampleFormControlInput1`, className = `form-control-label`) => {
        return (
            <label
                className={className}
                htmlFor={htmlFor}
            >
                {label}
            </label>
        );
    }
    editTaskName = (metaTaskName) => {
        this.setState({
            metaTaskName
        })
    }
    toggleEditTaskName = (editingMode) => {
        if (editingMode) {
            this.setState({
                isEditingTaskName: false,
                taskName: this.state.metaTaskName
            })
        }
        else {
            this.setState({
                isEditingTaskName: true
            })
        }

    }
    render() {
        document.title = "Create Task";
        const { isEditingTaskName, metaTaskName, taskName } = this.state;
        return (
            <>
                <div className="card-wrapper">
                    <Card>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    {this.renderLabel(`Task Name`, ``)}
                                    {
                                        isEditingTaskName ?
                                            <Input placeholder="Enter Task Name"
                                                type="text"
                                                onChange={({ target: { value } }) => this.editTaskName(value)}
                                                value={metaTaskName}
                                            /> :
                                            <Input placeholder="Enter Task Name"
                                                disabled
                                                type="text"
                                                onChange={({ target: { value } }) => this.editTaskName(value)}
                                                value={taskName}
                                            />
                                    }
                                    <br />
                                    <button className="btn btn-success" type="button" onClick={() => this.toggleEditTaskName(isEditingTaskName)}>
                                        {
                                            isEditingTaskName ?
                                                "Done" :
                                                "Edit Task Name"
                                        }
                                    </button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    <Table table={tasks} route={'Stories'}/>
                </div>
            </>
        );
    }
}

export default TaskDetail;
