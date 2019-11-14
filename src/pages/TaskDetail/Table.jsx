import React from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    Table,
    Input,
    Col,
    Row,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    FormGroup,
} from "reactstrap";
import _ from 'lodash';
import RenderBlade from './Renderblade';

class TableContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    renderTitle = (tableName = `Table Name`) => {
        return (
            <CardHeader className="border-0">
                <h3 className="mb-0">{tableName}</h3>
            </CardHeader>
        );
    }

    renderHeader = (...headers) => {
        console.log("header is....", headers);
        return (
            <thead className="thead-light">
                <tr>
                    <th style={{ position: "absolute" }}>S.No.</th>
                    {headers.map((el, index) => <th
                        className="sort"
                        data-sort="name"
                        scope="col"
                        key={index}
                        style={(index === 0) ? { position: "absolute" } : {}}
                    >{el}</th>)}
                </tr>
            </thead>
        );
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

    searchTable(value) {
        console.log(this.state.tableData, 'tableData')
        if (value.trim().length) {
            let filteredArray = _.map(this.props.table, function (o) {
                console.log(o, o.name.indexOf(value), 'item')
                if (o.name.toLowerCase().indexOf(value.trim().toLowerCase()) > -1) return o;
            });
            filteredArray = _.without(filteredArray, undefined)
            console.log(filteredArray, 'filteredArray')
            this.setState({ tableData: filteredArray })
        } else {
            this.setState({ tableData: this.props.table })
        }
    }

    render() {
        const { table, route, status, rawData } = this.props;
        console.log(table, rawData, 'table llks')

        let tableData = this.state.tableData ? this.state.tableData : table
        if (!table || !table[0]) return null;
        const headers = Object.keys(table[0]).filter(el => el !== `_id`);
        const title = status && tableData.length ? tableData[0].status.displayName : route
        return (
            <React.Fragment >
                <div className="mt--6 container-fluid">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col xs="8" sm="8">
                                    {this.renderTitle(title)}
                                </Col>
                                <Col xs="4" sm="4">  <FormGroup className="mb-0">
                                    <InputGroup className="input-group-alternative input-group-merge">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText >
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={({ target: { value: taskName } }) => this.searchTable(taskName)} placeholder="Search" type="text" />
                                    </InputGroup>
                                </FormGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <Table
                            className="align-items-center table-flush"
                            responsive
                        >
                            {this.renderHeader(...headers)}
                            {
                                tableData.length ?
                                    <tbody key={tableData.length} className="list">
                                        {tableData.map((tupple, index) => <RenderBlade tupple={tupple} index={index+1}/>)}
                                    </tbody>
                                    :
                                    <p style={{ textAlign: 'center' }}>
                                        No results found
                                    </p>
                            }
                        </Table>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default TableContent;
