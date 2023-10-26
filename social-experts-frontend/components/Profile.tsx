import React from 'react'
import { Form, Input, InputNumber, Checkbox, Select } from 'antd'
import { init } from 'next/dist/compiled/webpack/webpack'

const { Option } = Select

export interface profileType {
  min_salary: number
  location: string
  roles: { name: string; experience: number }[]
  skills: string[]
  active: boolean
}

const emptyProfile = {
  min_salary: 0,
  location: '',
  roles: [{ name: '', experience: 0 }],
  skills: [],
  active: true,
}

interface ProfileFormProps {
  handleOnFinish: (values: profileType) => void
}

const ProfileForm = ({ handleOnFinish }: ProfileFormProps) => {
  const [form] = Form.useForm()

  const onFinish = (values: profileType) => {
    handleOnFinish(values)
  }

  return (
    <Form
      form={form}
      name="myForm"
      onFinish={onFinish}
      initialValues={emptyProfile}
      layout="vertical"
    >
      <Form.Item
        label="Minimum Salary"
        name="min_salary"
        rules={[
          {
            required: true,
            message: 'Please input the minimum salary!',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please select a location!',
          },
        ]}
      >
        <Select placeholder="Select Location">
          {['Any', 'Remote', 'Office', 'Hybrid'].map((location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Roles"
        name="roles"
        rules={[
          {
            required: true,
            message: 'Please input the roles!',
          },
        ]}
      >
        <Input.Group compact>
          <Form.Item
            name={['roles', 0, 'name']}
            noStyle
            rules={[{ required: true, message: 'Role name is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder="Role Name" />
          </Form.Item>
          <Form.Item
            name={['roles', 0, 'experience']}
            noStyle
            rules={[{ required: true, message: 'Experience is required' }]}
          >
            <InputNumber style={{ width: '50%' }} placeholder="Experience" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        label="Select up to 5 skills"
        name="skills"
        rules={[
          {
            required: true,
            message: 'Please select skills!',
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select Skills" maxTagCount={5}>
          <Option value="Java">Java</Option>
          <Option value="Python">Python</Option>
          <Option value="JavaScript">JavaScript</Option>
          <Option value="C++">C++</Option>
          <Option value="Ruby">Ruby</Option>
          <Option value="PHP">PHP</Option>
          <Option value="C#">C#</Option>
          <Option value="HTML">HTML</Option>
          <Option value="CSS">CSS</Option>
          <Option value="React.js">React.js</Option>
          <Option value="Angular">Angular</Option>
          <Option value="Vue.js">Vue.js</Option>
          <Option value="Node.js">Node.js</Option>
          <Option value="Express.js">Express.js</Option>
          <Option value="SQL">SQL</Option>
          <Option value="MySQL">MySQL</Option>
          <Option value="PostgreSQL">PostgreSQL</Option>
          <Option value="SQLite">SQLite</Option>
          <Option value="MongoDB">MongoDB</Option>
          <Option value="AWS">AWS</Option>
          <Option value="Azure">Azure</Option>
          <Option value="GCP">GCP</Option>
          <Option value="Docker">Docker</Option>
          <Option value="Kubernetes">Kubernetes</Option>
          <Option value="Jenkins">Jenkins</Option>
          <Option value="Git">Git</Option>
          <Option value="Ethical Hacking">Ethical Hacking</Option>
          <Option value="Security Analysis">Security Analysis</Option>
          <Option value="Firewall Configuration">Firewall Configuration</Option>
          <Option value="TensorFlow">TensorFlow</Option>
          <Option value="PyTorch">PyTorch</Option>
          <Option value="NLP">Natural Language Processing</Option>
          <Option value="Cisco">Cisco</Option>
          <Option value="TCP/IP">TCP/IP</Option>
          <Option value="Routing/Switching">Routing/Switching</Option>
          <Option value="Verbal Communication">Verbal Communication</Option>
          <Option value="Written Communication">Written Communication</Option>
          <Option value="Active Listening">Active Listening</Option>
          <Option value="Critical Thinking">Critical Thinking</Option>
          <Option value="Analytical Skills">Analytical Skills</Option>
          <Option value="Collaboration">Collaboration</Option>
          <Option value="Conflict Resolution">Conflict Resolution</Option>
          <Option value="Embracing Change">Embracing Change</Option>
          <Option value="Learning Agility">Learning Agility</Option>
          <Option value="Prioritization">Prioritization</Option>
          <Option value="Meeting Deadlines">Meeting Deadlines</Option>
          <Option value="Decision Making">Decision Making</Option>
          <Option value="Delegation">Delegation</Option>
          <Option value="Adobe Photoshop">Adobe Photoshop</Option>
          <Option value="Illustrator">Illustrator</Option>
          <Option value="InDesign">InDesign</Option>
          <Option value="Sketch">Sketch</Option>
          <Option value="Figma">Figma</Option>
          <Option value="Adobe XD">Adobe XD</Option>
          <Option value="Premiere Pro">Premiere Pro</Option>
          <Option value="After Effects">After Effects</Option>
          <Option value="Agile/Scrum">Agile/Scrum</Option>
          <Option value="Microsoft Project">Microsoft Project</Option>
          <Option value="SEO/SEM">SEO/SEM</Option>
          <Option value="Social Media Marketing">Social Media Marketing</Option>
          <Option value="Excel">Excel</Option>
          <Option value="Financial Modeling">Financial Modeling</Option>
          <Option value="Relationship Building">Relationship Building</Option>
          <Option value="Negotiation Skills">Negotiation Skills</Option>
          <Option value="Empathy">Empathy</Option>
          <Option value="Legal Research">Legal Research</Option>
          <Option value="Contract Negotiation">Contract Negotiation</Option>
        </Select>
      </Form.Item>

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>

      <Form.Item>
        <button type="submit">Create your profile</button>
      </Form.Item>
    </Form>
  )
}

export default ProfileForm
