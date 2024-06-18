import React from 'react';
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UserInfo = ({ formValues, handleChange, isEditing }: any) => (
    <div className="flex flex-col py-3">
        <LabelInputContainer>
            <Label htmlFor="username">Usuario*</Label>
            <Input id="username" placeholder="Mafer" type="text" value={formValues.username} onChange={handleChange} readOnly={!isEditing} />
        </LabelInputContainer>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 py-3 md:space-x-2 mb-4">
            <LabelInputContainer>
                <Label htmlFor="firstName">Nombres</Label>
                <Input id="firstName" placeholder="Maria" type="text" value={formValues.firstName} onChange={handleChange} readOnly={!isEditing} />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" placeholder="Moreno" type="text" value={formValues.lastName} onChange={handleChange} readOnly={!isEditing} />
            </LabelInputContainer>
        </div>
    </div>
);

export default UserInfo;
