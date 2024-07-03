"use client";
import {useState} from "react";
import { Form } from "react-hook-form";

export default function HoldingsForm() {
    const [inputFields, setInputFields] = useState([
        {
            asset_class: "",
            asset_name:"",
            quantity:"",
            price:"",
        }
    ]);

    const addFields = () => {
        setInputFields([...inputFields, {
            asset_class: "",
            asset_name:"",
            quantity:"",
            price:"",
        }]);
    }

    return (
        <div>
            <Form>
                
            </Form>
        </div>
    )
}