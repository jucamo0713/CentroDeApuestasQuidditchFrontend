import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { useEffect, useState } from 'react';
import './ProfileForm.css';
import { UserUseCaseInstance } from '../../../../application/dependencyInjection/UserUseCaseInstance';
import { User } from '../../../../domain/model/User';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';

export function ProfileForm(params: { loginData: SessionData }) {
    const [edit, setEdit] = useState(false);
    const [profile, setProfile] = useState<User>({
        dateBirth: new Date(),
        email: '',
        fullName: '',
        username: '',
    });
    const [editableData, setFormConfig] = useState<User>({ ...profile });
    const handleChange = (e: { target: { name: string; value: unknown } }) => {
        const { name, value } = e.target;
        setFormConfig({
            ...editableData,
            [name]: value,
        });
    };
    useEffect(() => {
        UserUseCaseInstance.getUser(params.loginData).then((v) => {
            setProfile(v);
            setFormConfig({ ...v });
        });
    }, [params.loginData]);
    if (edit) {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    LoadingSourceUseCase.setLoading();
                    const email = e.currentTarget.email;
                    const username = e.currentTarget.username;
                    const birthDate = e.currentTarget.birthDate;
                    const name = e.currentTarget.fullName;
                    if (email.value && username.value && birthDate.value && name.value) {
                        UserUseCaseInstance.updateUser(
                            email.value,
                            username.value,
                            new Date(birthDate.value),
                            name.value,
                            params.loginData,
                        )
                            .then((v) => {
                                setProfile(v);
                            })
                            .finally(() => {
                                setEdit(false);
                                LoadingSourceUseCase.unsetLoading();
                            });
                    } else {
                        !email.value && (email.className = 'error-input');
                        !username.value && (username.className = 'error-input');
                        !birthDate.value && (username.className = 'error-input');
                        !name.value && (username.className = 'error-input');
                        LoadingSourceUseCase.unsetLoading();
                    }
                }}
            >
                <div>
                    <label htmlFor="fullName">Nombre:</label>
                    <input onChange={handleChange} type="text" name="fullName" value={editableData.fullName} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} type="email" name="email" value={editableData.email} />
                </div>
                <div>
                    <label htmlFor="name">Usuario:</label>
                    <input onChange={handleChange} type="text" name="username" value={editableData.username} />
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento:</label>
                    <input
                        onChange={handleChange}
                        type="date"
                        name="birthDate"
                        value={editableData.dateBirth.toISOString().split('T')[0]}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setEdit(false);
                            setFormConfig(profile);
                        }}
                        value="Descartar Cambios"
                    />
                    <input type="submit" value="Guardar Cambios" />
                </div>
            </form>
        );
    } else {
        return (
            <>
                <div>
                    <label htmlFor="fullName">Nombre:</label>
                    <p>{profile.fullName}</p>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <p>{profile.email}</p>
                </div>
                <div>
                    <label htmlFor="name">Usuario:</label>
                    <p>{profile.username}</p>
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento:</label>
                    <p>{profile.dateBirth.toLocaleDateString()}</p>
                </div>
                <input
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setEdit(true);
                    }}
                    value="Editar"
                />
            </>
        );
    }
}
