import React, { useState } from 'react';
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SocialMediaInfo = ({ formValues, handleChange, isEditing }: any) => {
    const [socialLinks, setSocialLinks] = useState<string[]>([formValues.social1 || '']);

    const handleAddSocialLink = () => {
        setSocialLinks([...socialLinks, '']);
    };

    const handleSocialLinkChange = (index: number, value: string) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = value;
        setSocialLinks(updatedLinks);
        handleChange({ target: { id: `social${index + 1}`, value } });
    };

    return (
        <div className='flex flex-col py-8 gap-5'>
            <h2>Redes De Contacto</h2>
            {socialLinks.map((link, index) => (
                <LabelInputContainer key={index}>
                    <Label htmlFor={`social${index + 1}`}>Red social {index + 1}</Label>
                    <Input
                        id={`social${index + 1}`}
                        placeholder={`https://www.example.com/${index + 1}`}
                        type="text"
                        value={link}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        readOnly={!isEditing}
                    />
                </LabelInputContainer>
            ))}
            {isEditing && (
                <button type="button" className="bg-blue-500 text-white p-2 rounded-xl mt-4" onClick={handleAddSocialLink}>
                    Añadir Otra Red Social
                </button>
            )}
        </div>
    );
};

export default SocialMediaInfo;
