import React from 'react';
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SocialMediaInfo = ({ formValues, handleChange, isEditing }: any) => (
    <div className='flex flex-col py-8 gap-5'>
        <h2>Redes De Contacto</h2>
        <LabelInputContainer>
            <Label htmlFor="social1">Red social 1</Label>
            <Input id="social1" placeholder="https://www.facebook.com/qweasdzxc" type="text" value={formValues.social1} onChange={handleChange} readOnly={!isEditing} />
        </LabelInputContainer>
        <LabelInputContainer>
            <Label htmlFor="social2">Red social 2</Label>
            <Input id="social2" placeholder="https://www.twitter.com/qweasdzxc" type="text" value={formValues.social2} onChange={handleChange} readOnly={!isEditing} />
        </LabelInputContainer>
    </div>
);

export default SocialMediaInfo;
