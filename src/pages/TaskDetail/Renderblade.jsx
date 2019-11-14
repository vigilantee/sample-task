import React, { useState } from "react";
import {
    Media,
    Input,
} from "reactstrap";

const RenderBlade = ({ tupple, index }) => {
    const keys = Object.keys(tupple);
    const renderLabel = (label = "label", htmlFor = `exampleFormControlInput1`, className = `form-control-label`) => {
        return (
            <label
                className={className}
                htmlFor={htmlFor}
            >
                {label}
            </label>
        );
    }

    let [isEditingTaskName, setIsEditingTaskName] = useState(false);
    let [metaTaskName, setMetaTaskName] = useState(tupple[`name`]);
    let [taskName, setTaskName] = useState(tupple[`name`]);
    // const { isEditingTaskName, metaTaskName, taskName } = this.state;

    let toggleEditTaskName = (editingMode) => {
        if (editingMode) {
            setIsEditingTaskName(false);
            setTaskName(metaTaskName);
        }
        else {
            setIsEditingTaskName(true);
        }

    }

    return (
        <tr key={index}>
            {keys.map((el, i) =>
                (
                    <th scope="row"
                        key={i}
                        style={{ backgroundColor: tupple.status }}
                    // style={{ backgroundColor: ['red','yellow'].includes(tupple.status.toLowerCase())?tupple.status:'green' }}
                    >
                        {
                            (el === `status`)
                                ?
                                <Media className="align-items-center">
                                    <Input type="select">
                                        <option value={tupple[el]} >{tupple[el]}</option>
                                    </Input>
                                </Media>
                                :
                                (el === `name`) ?
                                    (
                                        renderLabel(`Task Name`, ``) &&
                                        <div>
                                            {
                                                (isEditingTaskName ?
                                                    <Input placeholder="Enter Task Name"
                                                        type="text"
                                                        onChange={({ target: { value } }) => setMetaTaskName(value)}
                                                        value={metaTaskName}
                                                    /> :
                                                    <Input placeholder="Enter Task Name"
                                                        disabled
                                                        type="text"
                                                        value={taskName}
                                                    />)
                                            }
                                            <button className="btn btn-success" type="button" onClick={() => toggleEditTaskName(isEditingTaskName)}>
                                                {
                                                    isEditingTaskName ?
                                                        "Done" :
                                                        "Edit Task Name"
                                                }
                                            </button>
                                        </div>
                                    )
                                    :
                                    (
                                        <Media className="align-items-center">
                                            <span className="name mb-0 text-sm">{(typeof tupple[el] === 'object') ? "Object" : tupple[el]}</span>
                                        </Media>
                                    )
                        }
                    </th>
                )
            )}
        </tr>

    );
}

export default RenderBlade;
