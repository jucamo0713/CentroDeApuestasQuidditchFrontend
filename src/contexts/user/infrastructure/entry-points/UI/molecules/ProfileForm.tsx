import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { useEffect, useState } from 'react';
import './ProfileForm.css';
import { UserUseCaseInstance } from '../../../../application/dependencyInjection/UserUseCaseInstance';
import { User } from '../../../../domain/model/User';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import './ProfileForm.css';

export function ProfileForm(params: { loginData: SessionData }) {
    const [edit, setEdit] = useState(false);
    const [profile, setProfile] = useState<User>({
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
                className="form-edit"
                onSubmit={(e) => {
                    e.preventDefault();
                    LoadingSourceUseCase.setLoading();
                    const email = e.currentTarget.email;
                    const username = e.currentTarget.username;
                    const name = e.currentTarget.fullName;
                    if (email.value && username.value && name.value) {
                        UserUseCaseInstance.updateUser(email.value, username.value, name.value, params.loginData)
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
                        !name.value && (username.className = 'error-input');
                        LoadingSourceUseCase.unsetLoading();
                    }
                }}
            >
                <div className="input-container">
                    <label htmlFor="fullName">Nombre:</label>
                    <input onChange={handleChange} type="text" name="fullName" value={editableData.fullName} />
                </div>

                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} type="email" name="email" value={editableData.email} />
                </div>

                <div className="input-container">
                    <label htmlFor="username">Usuario:</label>
                    <input onChange={handleChange} type="text" name="username" value={editableData.username} />
                </div>

                <div className="buttons-container">
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
                <form className="form-edit">
                    <div className="input-container">
                        <label htmlFor="fullName">Nombre:</label>
                        <p className="p-data">{profile.fullName}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <p className="p-data">{profile.email}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="name">Usuario:</label>
                        <p className="p-data">{profile.username}</p>
                    </div>
                    <div className="buttons-container">
                        <input
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setEdit(true);
                            }}
                            value="Editar"
                        />
                    </div>
                </form>
            </>
        );
    }
}
