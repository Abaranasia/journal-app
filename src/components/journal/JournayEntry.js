import React from 'react'

export const JournayEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVkkZjXvk82ffyCBUJOEtt8fNbVpLUh2mpw&usqp=CAU)'
                }}
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Los navegadores no entienden JSX por defecto, por lo que la mayoría de usuarios de React utilizan un compilador como Babel o TypeScript para transformar el código JSX en JavaScript normal.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Lunes</span>
                <h4>25</h4>
            </div>
        </div>
    )
}
