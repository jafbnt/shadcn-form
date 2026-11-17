# shadcn-form

Biblioteca de formulários para React baseada em `rc-field-form`, com API inspirada no Ant Design e componentes visuais no estilo shadcn/ui.

## Visao geral

`shadcn-form` combina:

- **Engine de formulario robusta** com `rc-field-form` (validacao, listas dinamicas e controle de estado).
- **API familiar** para quem ja usa `Form`, `Form.Item`, `Form.List` e hooks no estilo Antd.
- **Componentes de entrada prontos** para acelerar UI de formularios.

## Instalacao

```bash
npm install shadcn-form
```

Peer dependencies necessarias:

- `react` `^18.2.0 || ^19.0.0`
- `react-dom` `^18.2.0 || ^19.0.0`

## Uso rapido

```tsx
import { Form, Input, Checkbox } from "shadcn-form";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export function LoginExample() {
  const [form] = Form.useForm<LoginForm>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        console.log("submit:", values);
      }}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: "Informe seu e-mail" },
          { type: "email", message: "E-mail invalido" },
        ]}
      >
        <Input placeholder="voce@empresa.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Senha"
        rules={[{ required: true, message: "Informe sua senha" }]}
      >
        <Input.Password placeholder="Digite sua senha" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Lembrar de mim</Checkbox>
      </Form.Item>

      <button type="submit">Entrar</button>
    </Form>
  );
}
```

## API principal

### `Form`

Props mais usadas:

- `layout`: `"horizontal" | "vertical" | "inline"`
- `initialValues`
- `onFinish`
- `onFinishFailed`
- `disabled`
- `requiredMark`
- `scrollToFirstError`

Metodos/hook uteis:

- `Form.useForm()`
- `Form.useWatch()`
- `Form.useFormInstance()`

Subcomponentes:

- `Form.Item`
- `Form.List`
- `Form.ErrorList`
- `Form.Provider`

### `Form.Item`

Props importantes:

- `name`
- `label`
- `rules`
- `valuePropName`
- `trigger`
- `getValueFromEvent`
- `normalize`
- `help`
- `extra`
- `validateStatus`
- `noStyle`

## Componentes disponiveis

- `Input` (`Input.Password`, `Input.TextArea`)
- `InputNumber`
- `Select`
- `Checkbox` (`Checkbox.Group`)
- `Radio`, `Radio.Group`, `Radio.Button`
- `Switch`
- `DatePicker` (`DatePicker.RangePicker`)
- `TimePicker`
- `Slider`
- `Rate`
- `ColorPicker`
- `Mentions`
- `Cascader`
- `TreeSelect`
- `Transfer`
- `Upload` (`Upload.Dragger`)

## Exemplos

### 1) Formulario com validacao e layout horizontal

```tsx
import { Form, Input, Select } from "shadcn-form";

type ProfileForm = {
  name: string;
  role: string;
};

export function ProfileExample() {
  return (
    <Form
      name="profile"
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={(values) => console.log(values)}
    >
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: "Nome obrigatorio" }]}
      >
        <Input placeholder="Seu nome" />
      </Form.Item>

      <Form.Item
        name="role"
        label="Perfil"
        rules={[{ required: true, message: "Selecione um perfil" }]}
      >
        <Select
          options={[
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
            { label: "Viewer", value: "viewer" },
          ]}
        />
      </Form.Item>

      <button type="submit">Salvar</button>
    </Form>
  );
}
```

### 2) Campos dinamicos com `Form.List`

```tsx
import { Form, Input } from "shadcn-form";

type SkillForm = {
  skills: Array<{ name: string }>;
};

export function SkillsExample() {
  return (
    <Form<SkillForm> initialValues={{ skills: [{ name: "" }] }} onFinish={console.log}>
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key} style={{ display: "flex", gap: 8 }}>
                <Form.Item
                  name={[field.name, "name"]}
                  rules={[{ required: true, message: "Informe a habilidade" }]}
                >
                  <Input placeholder="Ex: React, TypeScript..." />
                </Form.Item>

                <button type="button" onClick={() => remove(field.name)}>
                  Remover
                </button>
              </div>
            ))}

            <button type="button" onClick={() => add({ name: "" })}>
              Adicionar habilidade
            </button>
          </>
        )}
      </Form.List>

      <button type="submit">Enviar</button>
    </Form>
  );
}
```

### 3) Upload com `getValueFromEvent`

```tsx
import { Form, Upload } from "shadcn-form";

type UploadForm = {
  files: unknown[];
};

export function UploadExample() {
  return (
    <Form<UploadForm> onFinish={console.log}>
      <Form.Item
        name="files"
        label="Arquivos"
        valuePropName="fileList"
        getValueFromEvent={(info) => info?.fileList ?? []}
        rules={[{ required: true, message: "Envie ao menos um arquivo" }]}
      >
        <Upload multiple />
      </Form.Item>

      <button type="submit">Enviar</button>
    </Form>
  );
}
```

## Compatibilidade com Ant Design

- A API foi inspirada no Antd e varios fluxos sao semelhantes.
- O gerenciamento de formulario usa `rc-field-form`, o mesmo motor usado pelo Antd.
- **Nao existe paridade 100%** em todos os componentes visuais.
- Controles como `DatePicker`, `Upload` e outros sao implementacoes proprias e simplificadas.

Se voce precisa reproduzir comportamento avancado e identico ao Antd em componentes especificos, valide caso a caso.

## Scripts de desenvolvimento

```bash
npm run build
npm run dev
npm run typecheck
npm run clean
```

## Licenca

MIT
