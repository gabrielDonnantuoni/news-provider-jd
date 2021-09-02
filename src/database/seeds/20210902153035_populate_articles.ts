import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('articles').del()

  await knex('articles').insert([
    {
      id: 1,
      authorId: 1,
      categoryId: 1,
      title: 'Random Title',
      summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      firstParagraph: '<p>Fusce imperdiet lacus ut ante accumsan, vitae sodales augue porta. Nullam felis lorem, ultricies sed facilisis at, euismod sed nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget turpis non sapien ornare pellentesque. Pellentesque egestas nisl nec consectetur vehicula. Praesent nec justo et est convallis semper. Aliquam bibendum purus at urna auctor mattis. Integer tempus pellentesque metus, sed blandit felis feugiat sed. Nunc id nunc ut lacus maximus porttitor id ac augue. Morbi varius, dui sit amet blandit mattis, libero arcu consequat quam, nec tempus erat magna et erat. Nulla pellentesque, dui et fermentum luctus, libero enim rhoncus magna, a malesuada eros ante in est.</p>',
      body: `<div>
      <p>Nulla commodo egestas dui non convallis. Sed aliquam accumsan aliquet. Nullam euismod nunc sapien, fringilla suscipit sem sollicitudin non. Cras est turpis, dignissim ac dictum quis, elementum tempor felis. Cras vitae quam et felis porttitor venenatis. Donec mattis consectetur risus.</p>
      <p>Nam aliquam dolor quis consectetur luctus. In a congue nisl, at condimentum neque. Sed eleifend malesuada commodo. Sed pharetra iaculis lacus, quis lacinia eros ultricies ut. Sed in purus sit amet elit convallis vehicula ac nec felis. Donec dapibus libero a gravida dignissim.</p>
      </div>`,
    },
    {
      id: 2,
      authorId: 2,
      categoryId: 3,
      title: 'Quisque et pharetra quam',
      summary: 'Etiam eu fringilla mauris, ac placerat augue. Integer molestie nisi dolor, eget consectetur tellus feugiat suscipit. Praesent quis ante condimentum, maximus massa consectetur, blandit elit.',
      firstParagraph: '<p>Nam posuere euismod massa, in lobortis felis pellentesque eu. Vivamus pulvinar lorem massa, sit amet finibus est cursus in</p>',
      body: `<div>
      <p>Vestibulum eget convallis nibh. Donec vulputate velit et elit finibus feugiat. Ut eu auctor felis, in fringilla odio. Proin vitae ultricies augue. Suspendisse accumsan orci eget iaculis vestibulum.</p>
      <p>Fusce aliquet interdum magna, at ullamcorper risus consequat a. Curabitur aliquam ullamcorper dolor sed commodo. Sed in justo at nibh venenatis blandit. Etiam pellentesque purus ac quam euismod ullamcorper.</p>
      </div>`,
    },
    {
      id: 3,
      authorId: 4,
      categoryId: 2,
      title: 'Donec sit amet facilisis libero',
      summary: 'Etiam eu fringilla mauris, ac placerat augue. Integer molestie nisi dolor, eget consectetur tellus feugiat suscipit. Praesent quis ante condimentum, maximus massa consectetur, blandit elit.',
      firstParagraph: '<p>Etiam consectetur, nisi vitae pulvinar tristique, odio velit posuere ipsum, vel maximus ante turpis at ante.</p>',
      body: `<div>
      <p>Cras nec neque sed turpis pharetra lobortis. Etiam faucibus est et nulla pellentesque maximus. Aenean pharetra metus non condimentum feugiat. Nam in dictum augue, ac rutrum tellus.</p>
      <p>Vestibulum eget convallis nibh. Donec vulputate velit et elit finibus feugiat. Ut eu auctor felis, in fringilla odio. Proin vitae ultricies augue. Suspendisse accumsan orci eget iaculis vestibulum.</p>
      </div>`,
    },
    {
      id: 4,
      authorId: 5,
      categoryId: 7,
      title: 'Donec lectus neque',
      summary: 'Etiam eu fringilla mauris, ac placerat augue. Integer molestie nisi dolor, eget consectetur tellus feugiat suscipit. Praesent quis ante condimentum, maximus massa consectetur, blandit elit.',
      firstParagraph: '<p>Nullam feugiat orci non risus tincidunt, sit amet bibendum elit auctor. Nulla malesuada neque dui, vitae laoreet elit pulvinar id. Nullam blandit ipsum a interdum mattis.</p>',
      body: `<div>
      <p>Curabitur id est sit amet diam finibus fringilla eu a ante. Sed lacinia, nulla at tempus mollis, ligula magna venenatis ex, non dapibus turpis est sit amet est. Sed tincidunt arcu sed mollis tincidunt. </p>
      <p>Nulla auctor non sem in tincidunt. Praesent finibus facilisis orci, id dapibus ante elementum ut.</p>
      </div>`,
    },
    {
      id: 5,
      authorId: 1,
      categoryId: 1,
      title: 'Vestibulum arcu velit',
      summary: 'Etiam eu fringilla mauris, ac placerat augue. Integer molestie nisi dolor, eget consectetur tellus feugiat suscipit. Praesent quis ante condimentum, maximus massa consectetur, blandit elit.',
      firstParagraph: '<p>Quisque ac malesuada elit, eu elementum felis. Morbi blandit condimentum ornare.</p>',
      body: `<div>
      <p>Mauris sit amet nibh pretium, vehicula felis eu, imperdiet justo. Phasellus erat mauris, tincidunt ut interdum sit amet, dictum sit amet tortor.</p>
      <p>Aenean pretium gravida est ultrices pellentesque. Aliquam in mauris malesuada, maximus nunc feugiat, tempus tortor. Duis eu mattis nulla, vitae condimentum odio. Suspendisse quis tempus elit, nec ultrices eros. Donec vel justo neque.</p>
      </div>`,
    },
  ])
}