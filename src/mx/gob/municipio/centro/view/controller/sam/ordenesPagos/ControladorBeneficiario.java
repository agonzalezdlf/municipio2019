/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.ordenesPagos;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBancos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayGiros;
import mx.gob.municipio.centro.model.gateways.sam.GatewayRubros;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.GatewayVialidades;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/sam/ordenesdepago/beneficiario.action")
public class ControladorBeneficiario extends ControladorBase  {
	private static Logger log = 
        Logger.getLogger(ControladorBeneficiario.class.getName());

	@Autowired GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired GatewayBancos gatewayBancos;
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	private GatewayGiros gatewayGiros;
	
	@Autowired
	private GatewayRubros gatewayRubros;
	
	@Autowired
	private GatewayVialidades gatewayVialidades;
	
	public ControladorBeneficiario() {}
	 
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})      
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		
		Long  id = (request.getParameter("id")!=null)? Long.parseLong(request.getParameter("id").toString()): 0;
		String tipo =request.getParameter("tipo"); 
		modelo.put("tipo", tipo);
		modelo.put("id", id);
		modelo.put("beneficiario", getBeneficiario(id));
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("clv_giro",gatewayGiros.getGiros());
		modelo.put("clv_rubro",gatewayRubros.getRubros());
		modelo.put("id_vialidad",gatewayVialidades.getVialidades());
		
	    return "sam/ordenesdepago/beneficiario.jsp";
	}   
	    
	public  void   eliminarBenificiario(final List<Long> beneficiarios){
		 try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {	                	
	                	for (Long idBeneficiario :beneficiarios)
	                		gatewayBeneficiario.eliminar(idBeneficiario);	                			                	
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("Los registros tienen relaciones con otras tablas ");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }	
	}
	
	
	public Map<String, String> getBeneficiario (Long idBeneficiario){
		return gatewayBeneficiario.getBeneficiario(idBeneficiario);
		
	}
	
	/*
	public  Map getBeneficiario(Long idBeneficiario){
		return gatewayBeneficiario.getBeneficiario(idBeneficiario);
	}*/
	
	public  List getBeneficiariosHijos(String idBeneficiario){
		return gatewayBeneficiario.getBeneficiariosTodosHijos(idBeneficiario);
	}
	
	public  List getBeneficiarios(String razonSocial){
		return gatewayBeneficiario.getBeneficiariosPorEjemplo(razonSocial);
	}
		
	public Long guardarBeneficiario(Long clave,String razonSocial,String racomercial,String email,String rfc, String curp, String telefono, String tipo, String calle,String colonia,String ciudad,String estado,Integer cp
			                        ,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,Integer status,String clabeb, String fecha_altab,
         	                         String fecha_bajab, String ap_paterno, String ap_materno, String nombre, String fecha_sat, Long ppmc, String num_interior,  String num_exterior, 
			                         String localidad, String ptipo, Integer id_giro,String fecha_modifica, Integer id_vialidad  ){
		
		return gatewayBeneficiario.actualizarPrincipal(clave, razonSocial, racomercial, email, rfc, curp, telefono, tipo, calle, colonia, ciudad, estado, cp, 
									idBanco, noCuenta, tipoCuenta, idBeneficiarioPadre, vigencia, status, clabeb, this.formatoFecha(fecha_altab),
									this.formatoFecha(fecha_bajab), ap_paterno, ap_materno, nombre, this.formatoFecha(fecha_sat), ppmc, num_interior,  num_exterior, 
									localidad, ptipo, id_giro, this.formatoFecha(fecha_modifica), id_vialidad);
	}
	
	public Long guardaRubroBenefi(Long clv_benefi, String id_rubro){
		return gatewayBeneficiario.rubrosBeneficiario(clv_benefi, id_rubro);
		
	}
	public Long guardarTipoRubro(Long clv_rubro, String rubro, Boolean status, String fecha_alta, String fecha_baja){
		return gatewayBeneficiario.actualizarRubro(clv_rubro, rubro, status, this.formatoFecha(fecha_alta), this.formatoFecha(fecha_baja));
		
	}
	public List getTodosRubrosBeneficiario(Integer clv_benefi) {
  	  return gatewayBeneficiario.getTodosRubrosBeneficiario(clv_benefi);
    } 
	
	  public void  eliminarRubros( final List<String> lstrubros,final  Long clv_benefi ) {
		  try {                
			//Verfificar si tiene los privilegios en solo lectura Ordenes de Pago
	  		if(getPrivilegioEn(getSesion().getIdUsuario(), 114)){
	  			throw new RuntimeException("No cuenta por los privilegios suficientes para realizar esta operación, solo lectura");
	  		}
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {	                	
	                	for (String rubro : lstrubros)
	                		gatewayBeneficiario.eliminaRubros(clv_benefi, rubro, getSesion().getEjercicio(), getSesion().getIdUsuario());	                			                	
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("Los registros tienen relaciones con otras tablas ");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }	                	                		  	  
	  }
	  
	/*@RequestMapping(value="/import-cheat", method=RequestMethod.POST)
	@ResponseBody
	public List<CheatImported> importCheats(@RequestParam("file") MultipartFile cheats) throws IllegalStateException, IOException{
	        String path = getFileName(cheats);
	        File file = new File(path);
	        cheats.transferTo(file);

	        try{
	            return importService.importJsonFile(path);
	        }catch(FileNotFoundException e){
	            return null;
	        }catch(ParseException e){
	            return null;
	        }
	}*/
	
	@RequestMapping(value = "/sam/ordenesdepago/beneficiario/upload-file", method = RequestMethod.POST)
	@ResponseBody
	public String saveFiles(HttpServletRequest request, HttpServletResponse response,@RequestParam("archivo") MultipartFile file, ModelMap model) throws IOException{
		Map m = new HashMap();
		
		Long clv_benefi = Long.parseLong(request.getParameter("cvebenefi"));
		String idDocumento = request.getParameter("idDocumento");
		String tipoMovDoc = request.getParameter("tipoMovDoc");
		String numeroDoc = request.getParameter("numeroDoc");
		String notaDoc = request.getParameter("notaDoc");
		
		m.put("mensaje", false);
		String ejercicio = request.getParameter("ejercicio");
		
		if(getPrivilegioEn(this.getSesion().getIdUsuario(), 114)){
			throw new RuntimeException("No cuenta por los privilegios suficientes para realizar esta operaciÃ³n, solo lectura");
		}
		
		if (Integer.parseInt(idDocumento.toString()) == 0) {
			  idDocumento = (String) this.getJdbcTemplate().queryForObject("select isnull(max(ANX_CONS),0)+1 from SAM_OP_ANEXOS where CVE_OP=? ", new Object[]{clv_benefi}, String.class);
			  gatewayBeneficiario.insertaDocumento(Integer.parseInt(idDocumento.toString()), tipoMovDoc, numeroDoc,notaDoc, clv_benefi, this.getSesion().getEjercicio(), this.getSesion().getIdUsuario());	  
		}else
			gatewayBeneficiario.actualizarDocumento(Integer.parseInt(idDocumento.toString()),tipoMovDoc,numeroDoc,notaDoc, clv_benefi, this.getSesion().getEjercicio(), this.getSesion().getIdUsuario());
		
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				// Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath() + File.separator + file);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                log.info("Server File Location="+ serverFile.getAbsolutePath());
				
				/*******************************************/
				String nombreArchivo = removeSpecialChar(file.getOriginalFilename());
			  	Long size = file.getSize();
			  	String path = request.getSession().getServletContext().getRealPath("")+"/sam/ordenesdepago/beneficiario_anexos/";	  	
			  	String tipoArchivo = file.getContentType();	 
			  	String ext = getExtension(nombreArchivo);
			  	String nombreFisico = clv_benefi.toString()+"_"+idDocumento.toString()+" "+nombreArchivo;
			  	almacenarArchivoFisico(file,path,nombreFisico); 
			  	String sql="UPDATE SAM_CAT_BENEFI_ANEXOS SET FILENAME=?, FILEPATH = ?, DATEFILE = ?, FILETYPE = ?, FILELENGTH = ? WHERE CLV_BENEFI = ? AND ANX_CONS = ?";
			  	this.getJdbcTemplate().update("sql", new Object[]{nombreFisico, "anexos/", new Date(), tipoArchivo, size, clv_benefi, idDocumento});
				 log.info("Server File Location=" + path);

	             return "You successfully uploaded file=" + file;
			} catch (Exception e) {
				return "You failed to upload " + file + " => " + e.getMessage();
			}
		}else{
            return "You failed to upload " + file  + " because the file was empty.";
        }
		
			 
	 }
	
	@ModelAttribute("bancos")
	public List<Map<String, Object>> getListaBancos(){
		return gatewayBancos.getBancosTodos();
	}
	
	@ModelAttribute("giros")
	public List<Map<String, Object>> getGiros(){
		return gatewayGiros.getGiros();
	}

	@ModelAttribute("vialidades")
	public List<Map<String, Object>> getvialidades(){
		return gatewayVialidades.getVialidades();
	}
	
	@ModelAttribute("rubros")
	public List<Map<String, Object>> getRubros(){
		return gatewayRubros.getRubros();
	}
	
	@ModelAttribute("beneficiarios")
	public List<Map>getBeneficiarios(){
		return  gatewayBeneficiario.getListaBeneficiarios();
	}
	
	
	@RequestMapping(value = "/get_benefi_list", method = RequestMethod.GET, params="Accept=*/*")
	public @ResponseBody List<String> getCountryList(@RequestParam("term") String query) {
			List<String> BenefiList = gatewayBeneficiario.getBenefiList(query);
			
			return BenefiList;
	}
}
