"use client";
import {
   Button, Description, FieldError, Form, Input, Label,
   TextField, TextArea, ListBox, Select, Calendar, DateField,
   DatePicker
} from "@heroui/react";
import React from "react";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

function MetasForm() {
   const [value, setValue] = React.useState("");

   const currentDate = today(getLocalTimeZone());

   const [startDate, setStartDate] = useState(null);
   const isStartInvalid = startDate != null && startDate.compare(currentDate) < 0;

   const [endDate, setEndDate] = useState(null);
   const isEndInvalid = endDate != null && endDate.compare(currentDate) < 0;


   const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      console.log("Form Data Submitted:", data);
   };

   return (
      <div>
         <h1 className="text-center">Meta</h1>
         <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={onSubmit}
         >
            <TextField
               isRequired
               name="titulo"
               type="text"
               validate={(value) => {
                  const trimmedValue = value ? value.trim() : "";

                  if (!trimmedValue) {
                     return "El titulo es requerido";
                  }
                  if (trimmedValue.length < 3) {
                     return "El titulo debe tener por lo menos 3 caracteres";
                  }
                  if (trimmedValue.length > 50) {
                     return "El titulo no puede tener mas de 50 caracteres";
                  }

                  return null;
               }}
            >
               <Label>Titulo</Label>
               <Input placeholder="Conseguir trabajo" />
               <FieldError />
            </TextField>
            <TextField
               name="descripcion"
               validate={(value) => {
                  const trimmedValue = value ? value.trim() : "";
                  if (trimmedValue.length > 280) {
                     return "La descripcion no puede exeder los 280 caracteres";
                  }
                  return null;
               }}>
               <Label>Descripcion</Label>
               <TextArea
                  aria-describedby="textarea-controlled-description"
                  aria-label="Announcement"
                  placeholder="Agrega breve descripcion"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
               />
               <Description id="textarea-controlled-description">
                  Caracteres: {value.length} / 280
               </Description>
               <FieldError />
            </TextField>
            <Select
               isRequired
               name="estado"
               className="w-full"
               placeholder="Seleccionar uno"
               label="Estado"
               validate={(value) => {
                  const selectedValue = Array.from(value)[0]?.toString() || "";
                  return !selectedValue.trim() ? "El estado es requerido" : true;
               }}
            >
               <Label>Estado</Label>
               <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
               </Select.Trigger>
               <Select.Popover>
                  <ListBox>
                     <ListBox.Item id="pendiente" textValue="Pendiente">
                        Pendiente
                        <ListBox.ItemIndicator />
                     </ListBox.Item>
                     <ListBox.Item id="en-proceso" textValue="En proceso">
                        En proceso
                        <ListBox.ItemIndicator />
                     </ListBox.Item>
                     <ListBox.Item id="finalizada" textValue="Finalizada">
                        Finalizada
                        <ListBox.ItemIndicator />
                     </ListBox.Item>
                  </ListBox>
               </Select.Popover>
            </Select>

            <DatePicker
               isRequired
               className="w-3/5 mx-auto"
               isInvalid={isStartInvalid}
               minValue={currentDate}
               name="fecha-de-inicio"
               value={startDate}
               onChange={setStartDate}
            >
               <Label>Fecha de inicio</Label>
               <DateField.Group fullWidth>
                  <DateField.Input>
                     {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                     <DatePicker.Trigger>
                        <DatePicker.TriggerIndicator />
                     </DatePicker.Trigger>
                  </DateField.Suffix>
               </DateField.Group>

               <FieldError>La fecha no puede ser en el pasado.</FieldError>

               <DatePicker.Popover>
                  <Calendar aria-label="Event date">
                     <Calendar.Header>
                        <Calendar.YearPickerTrigger>
                           <Calendar.YearPickerTriggerHeading />
                           <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>
                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                     </Calendar.Header>

                     <Calendar.Grid>
                        <Calendar.GridHeader>
                           {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                           {(date) => <Calendar.Cell date={date} />}
                        </Calendar.GridBody>
                     </Calendar.Grid>

                     <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                           {({ year }) => <Calendar.YearPickerCell year={year} />}
                        </Calendar.YearPickerGridBody>
                     </Calendar.YearPickerGrid>
                  </Calendar>
               </DatePicker.Popover>
            </DatePicker>
            <DatePicker
               isRequired
               className="w-3/5 mx-auto"
               isInvalid={isEndInvalid}
               minValue={currentDate}
               name="fecha-de-finalizacion"
               value={endDate}
               onChange={setEndDate}
            >
               <Label>Fecha de finalizacion</Label>
               <DateField.Group fullWidth>
                  <DateField.Input>
                     {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                     <DatePicker.Trigger>
                        <DatePicker.TriggerIndicator />
                     </DatePicker.Trigger>
                  </DateField.Suffix>
               </DateField.Group>

               <FieldError>La fecha no puede ser en el pasado.</FieldError>

               <DatePicker.Popover>
                  <Calendar aria-label="Event date">
                     <Calendar.Header>
                        <Calendar.YearPickerTrigger>
                           <Calendar.YearPickerTriggerHeading />
                           <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>
                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                     </Calendar.Header>

                     <Calendar.Grid>
                        <Calendar.GridHeader>
                           {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                           {(date) => <Calendar.Cell date={date} />}
                        </Calendar.GridBody>
                     </Calendar.Grid>

                     <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                           {({ year }) => <Calendar.YearPickerCell year={year} />}
                        </Calendar.YearPickerGridBody>
                     </Calendar.YearPickerGrid>
                  </Calendar>
               </DatePicker.Popover>
            </DatePicker>
            <div className="flex gap-2">
               <Button type="submit">
                  Submit
               </Button>
               <Button
                  type="reset"
                  variant="secondary"
                  onClick={() => setValue("")}>
                  Reset
               </Button>
            </div>
         </Form>
      </div>


   )
}

export default MetasForm
