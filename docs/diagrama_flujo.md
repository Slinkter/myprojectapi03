sequenceDiagram
    participant Usuario
    participant React_UI as React UI (View)
    participant Hooks as useCharacters (Hook)
    participant Redux_Store as Redux Store (Slice)
    participant Service_Layer as Thunk (Middleware)
    participant API_Layer as rickAndMortyAPI.js
    participant API_Externa as Rick & Morty API

    %% -- Inicio del Flujo de Carga Inicial --
    
    Usuario->>React_UI: 1. Accede a la aplicación / Monta componente
    React_UI->>Hooks: 2. Inicializa useCharacters()

    Hooks->>Redux_Store: 3. Lee estado actual (useSelector)
    Redux_Store-->>Hooks: Retorna status: 'idle'

    Hooks->>Hooks: Detecta status === 'idle'
    Hooks->>Redux_Store: 4. Despacha fetchCharacters() (useEffect)

    Redux_Store->>Redux_Store: 5. Reducer 'pending': cambia status a 'loading'
    Redux_Store-->>Hooks: Notifica cambio de estado

    note right of React_UI: La UI muestra el indicador de carga (Loading...)

    Redux_Store->>Service_Layer: 6. El Thunk intercepta la acción y ejecuta el payload creator
    Service_Layer->>API_Layer: 7. Llama a fetchCharactersAPI()
    API_Layer->>API_Externa: 8. GET https://rickandmortyapi.com/api/character

    alt Escenario: Éxito (200 OK)
        API_Externa-->>API_Layer: 9. Retorna JSON con { results: [...] }
        API_Layer->>API_Layer: 10. Parsea respuesta (response.json())
        API_Layer-->>Service_Layer: 11. Retorna array de personajes (data.results)
        Service_Layer-->>Redux_Store: 12. Retorna payload (personajes) al reducer
        Redux_Store->>Redux_Store: 13. Reducer 'fulfilled':<br/>status='succeeded', entities=[personajes]
    else Escenario: Error (Red/API)
        API_Externa-->>API_Layer: Retorna Error (404/500) o Falla Red
        API_Layer-->>Service_Layer: Lanza excepción (throw Error)
        Service_Layer-->>Redux_Store: Retorna error (rejectWithValue)
        Redux_Store->>Redux_Store: 13b. Reducer 'rejected':<br/>status='failed', error=mensaje
    end

    Redux_Store-->>Hooks: 14. Notifica nuevo estado (succeeded/failed)
    Hooks->>Hooks: 15. Filtra personajes (useMemo)<br/>si hay término de búsqueda
    Hooks-->>React_UI: 16. Retorna { filteredCharacters, status, ... }

    alt Renderizado Final
        React_UI->>React_UI: Muestra Grid de Personajes
    else Renderizado Error
        React_UI->>React_UI: Muestra Mensaje de Error + Botón Retry
    end
