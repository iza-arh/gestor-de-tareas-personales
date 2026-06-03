"use client";
import {
   Button, Description, FieldError, Form, Input, Label,
   TextField, TextArea, ListBox, Select, Calendar, DateField,
   DatePicker
} from "@heroui/react";
import React from "react";
import { useState, useEffect } from "react";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

const defaultFormState = {
   titulo: "",
   estado: "",
   descripcion: "",
   fechaDeInicio: null,
   fechaDeFinalizacion: null
};

function MetasForm({ onSubmitAction, formTitle = "Meta", initialData = null }) {

   let baseData = defaultFormState;

   function parseStringDate(obj) {
      const newObj = { ...obj };
      if (newObj.fechaDeInicio != null) {
         newObj.fechaDeInicio = typeof newObj.fechaDeInicio === "string"
            ? parseDate(newObj.fechaDeInicio)
            : newObj.fechaDeInicio;
      }

      if (newObj.fechaDeFinalizacion != null) {
         newObj.fechaDeFinalizacion = typeof newObj.fechaDeFinalizacion === "string"
            ? parseDate(newObj.fechaDeFinalizacion)
            : newObj.fechaDeFinalizacion;
      }

      return newObj;
   }

   const [formData, setFormData] = useState(() => {
      if (initialData) {
         const parsedInitialData = parseStringDate(initialData)
         return parsedInitialData
      }

      const savedDraft = window.sessionStorage.getItem('meta-draft');

      if (savedDraft) {
         baseData = JSON.parse(savedDraft);
         const parsedBasedData = parseStringDate(baseData)
         return parsedBasedData;
      }

      return baseData

   });

   useEffect(() => {
      if (!initialData) {
         const toSave = {
            ...formData,
            fechaDeInicio: formData.fechaDeInicio?.toString() ?? null,
            fechaDeFinalizacion: formData.fechaDeFinalizacion?.toString() ?? null,
         };

         const isEmpty =
            !formData.titulo &&
            !formData.estado &&
            !formData.descripcion &&
            !formData.fechaDeInicio &&
            !formData.fechaDeFinalizacion;

         if (isEmpty) {
            window.sessionStorage.removeItem('meta-draft');
         } else {
            const toSave = {
               ...formData,
               fechaDeInicio: formData.fechaDeInicio?.toString() ?? null,
               fechaDeFinalizacion: formData.fechaDeFinalizacion?.toString() ?? null,
            };
            window.sessionStorage.setItem('meta-draft', JSON.stringify(toSave));
         }
      }
   }, [formData, initialData]);


   const handleFieldChange = (name) => (value) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
   };

   const currentDate = today(getLocalTimeZone());

   const isStartInvalid = formData.fechaDeInicio != null && formData.fechaDeInicio.compare(currentDate) < 0;

   const isEndInvalid = formData.fechaDeFinalizacion != null && formData.fechaDeFinalizacion.compare(currentDate) < 0;

   const onSubmit = (e) => {
      e.preventDefault();

      let formattedData = {
         id: initialData?.id || Math.random().toString(36).substring(2, 11),
         titulo: formData.titulo,
         descripcion: formData.descripcion,
         estado: formData.estado,
         fechaDeInicio: formData.fechaDeInicio ? formData.fechaDeInicio.toString() : null,
         fechaDeFinalizacion: formData.fechaDeFinalizacion ? formData.fechaDeFinalizacion.toString() : null
      };

      onSubmitAction(formattedData);

      setFormData(defaultFormState);
      window.sessionStorage.removeItem('meta-draft');
   };

   return (
      <div>
         <h1 className="text-center">{formTitle}</h1>
         <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={onSubmit}
         >
            <TextField
               isRequired
               name="titulo"
               type="text"
               value={formData.titulo}
               onChange={handleFieldChange("titulo")}
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
               }}
               value={formData.descripcion}
               onChange={handleFieldChange("descripcion")}
            >
               <Label>Descripcion</Label>
               <TextArea
                  aria-describedby="textarea-controlled-description"
                  aria-label="Announcement"
                  placeholder="Agrega breve descripcion"
               />
               <Description id="textarea-controlled-description">
                  Caracteres: {formData.descripcion.length} / 280
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
               selectedKey={formData.estado}
               onSelectionChange={handleFieldChange("estado")}
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
               name="fechaDeInicio"
               value={formData.fechaDeInicio}
               onChange={handleFieldChange("fechaDeInicio")}
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
               name="fechaDeFinalizacion"
               value={formData.fechaDeFinalizacion}
               onChange={handleFieldChange("fechaDeFinalizacion")}
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
                  onClick={() => {
                     setFormData(defaultFormState);
                     window.sessionStorage.removeItem('meta-draft');
                  }}
               >
                  Reset
               </Button>
            </div>
         </Form>
      </div>
   )
}

export default MetasForm
