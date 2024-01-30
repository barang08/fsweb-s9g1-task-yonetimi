import React from 'react'
import { useForm } from "react-hook-form"
import { nanoid } from 'nanoid'

export default function TaskHookForm({ submitFn, kisiler }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onBlur"
  })

  function myHandleSubmit(e) {
    console.log(e)
    submitFn({
      ...e,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }



  return (
    <div>
      <form className='taskForm' onSubmit={handleSubmit(myHandleSubmit)}>
        <div className='form-line'>
          <label className="input-label" htmlFor="title">
            Başlık
            <input
              type="text"
              name="title"
              {...register("title",
                {
                  required: "Task başlığı yazmalısınız",
                  minLength: {
                    value: 3,
                    message: "Task başlığı en az 3 karakter olmalı"
                  }
                })}
            />
          </label>
          {errors.title && <p>{errors.title.message}</p>}

        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            name="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 3,
                message: "Task açıklaması en az 10 karakter olmalı"
              }
            })}
          ></textarea>
          {errors.description && <p>{errors.description.message} </p>}

        </div>


        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  name="people"
                  value={p}
                  {...register("people", {
                    required: "En az 1 kişi seçiniz",
                    minLength: {
                      validate: (arr) =>
                        arr.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                    }
                  })}

                />
                {p}
                {errors.people && errors.people.message}
              </label>
            ))}
          </div>

        </div>

        <div className="form-line">
          <button disabled={!isValid} className="submit-button" type="submit">
            Kaydet
          </button>
        </div>

      </form>

    </div>
  )
}
